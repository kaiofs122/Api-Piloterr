import prismaClient from "../../prisma";

class JobQueryService {
  async listAll(filters: { id?: string, localizacao?: string, palavraChave?: string }) {
    const { id, localizacao, palavraChave } = filters;

    return await prismaClient.job.findMany({
      where: {
        AND: [
          id ? { id } : {},
          localizacao ? { localizacao: { contains: localizacao, mode: "insensitive" } } : {},
          palavraChave ? {
            OR: [
              { titulo: { contains: palavraChave, mode: "insensitive" } },
              { descricao: { contains: palavraChave, mode: "insensitive" } }
            ]
          } : {}
        ]
      }
    });
  }

  async findById(id: string) {
    return await prismaClient.job.findUnique({
      where: { id },
    });
  }
}

export { JobQueryService };
