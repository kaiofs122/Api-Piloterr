import axios from "axios";
import dotenv from "dotenv";
import prismaClient from "../../prisma";

dotenv.config();


interface Job {
  titulo: string;
  empresa: string;
  empresaURL: string;
  localizacao: string;
  descricao?: string;
  dataPublicacao: string;
}

interface JobParams {
  page?: number;
}

class JobService {
  async execute( params : JobParams): Promise<Job[]> {
    try {
      const response = await axios.get(
        `https://piloterr.com/api/v2/linkedin/job/search?page=${params.page || 1}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.PILOTERR_API_KEY,
          },
        }
      );

      const jobs: any = response.data || [];

      console.log("Dados do data: ",response.data);

      if (!Array.isArray(jobs)) {
        throw new Error("Formato de dados inválido");
      }

      console.log(`🔹 Encontradas ${jobs.length} vagas. Salvando no banco...`);

      const savedJobs = await prismaClient.job.createMany({
        data: jobs.map((job) => ({

          titulo: job.title,
          empresa: job.company_name,
          empresaURL: job.company_url,
          localizacao: job.location,
          descricao: job.description || "Sem Descrição",
          dataPublicacao: new Date(job.list_date),

        })),
        skipDuplicates: true, 
      });

      console.log("Vagas salvas com sucesso!");

      return jobs;
    } catch (error) {
      console.error("Erro ao buscar ou salvar vagas:", error);
      return [];
    } 
  }
}

export { JobService };
