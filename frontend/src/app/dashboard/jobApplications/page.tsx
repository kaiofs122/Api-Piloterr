"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { RefreshCw } from "lucide-react";
import { api } from "@/services/api";
import { toast } from "sonner";

interface JobApplication {
  job: {
    id: string;
    titulo: string;
    empresa: string;
    empresaURL: string;
    localizacao: string;
    descricao: string;
    dataPublicacao: string;
  };
  id: string;
  dataCandidatura: string;
}

export default function JobApplications() {
  const [jobApplication, setJobApplication] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get("/application");
        setJobApplication(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao buscar candidaturas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleDelete = async (applicationId: string) => {
    try {
      await api.delete(`/application/remove/${applicationId}`);
      setJobApplication((prevApplications) =>
        prevApplications.filter((application) => application.id !== applicationId)
      );
      toast.success("Candidatura excluida com sucesso!");
    } catch (error: any) {
      toast.error("Erro ao excluir a candidatura: " + error.response.data.message);
    }
  };

  return (
    <main className={styles.container}>
      <section className={styles.containerHeader}>
        <h1>Candidaturas</h1>
        <button onClick={() => window.location.reload()} title="Atualizar">
          <RefreshCw size={24} color="#4a90e2" />
        </button>
      </section>

      {loading ? (
        <p className={styles.loading}>Carregando Candidaturas...</p>
      ) : jobApplication.length === 0 ? (
        <p className={styles.noJobs}>Nenhuma candidatura encontrada.</p>
      ) : (
        <section className={styles.listJobs}>
          {jobApplication.map((application) => (
            <div key={application.id} className={styles.tag}>
              <span className={styles.jobTitle}>{application.job.titulo}</span>
              <p className={styles.company}>{application.job.empresa}</p>
              <p className={styles.description}>{application.job.descricao}</p>
              <p className={styles.date}>
                Candidatura: {new Date(application.dataCandidatura).toLocaleDateString("pt-BR")}
              </p>
              <p className={styles.location}>📍 {application.job.localizacao}</p>
              <a
                href={application.job.empresaURL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.jobLink}
              >
                Ver vaga
              </a>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(application.id)}
              >
                Excluir
              </button>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
