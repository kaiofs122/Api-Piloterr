import prismaClient from "../../prisma";



class RemoveJobService {
  async execute(jobId: string) {

    try {
      if (!jobId || typeof jobId !== 'string') {
        throw new Error('ID da vaga inválido');
      }

      const removeJob = await prismaClient.job.delete({
        where: { id: jobId },
        select: {
          id: true,
          titulo: true,
          empresa: true,
          empresaURL: true,
          localizacao: true,
          descricao: true,
          dataPublicacao: true
        }
      });

      return removeJob;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error('Vaga não encontrada');
      }
      console.error("Erro ao excluir vaga:", error);
      throw new Error('Erro ao excluir vaga');
    }
  }
}

export { RemoveJobService };