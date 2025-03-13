import prismaClient from "../../prisma";

interface ListJobApplicationsRequest {
    userId: string;
}

class ListJobApplicationService {
    async execute({ userId }: ListJobApplicationsRequest) {
        try {
            const applications = await prismaClient.application.findMany({
                where: { usuario_Id: userId },
                include: {
                    job: {
                        select: {
                            id: true,
                            titulo: true,
                            empresa: true,
                            empresaURL: true,
                            localizacao: true,
                            descricao: true,
                            dataPublicacao: true
                        }
                    }
                },
                orderBy: { dataCandidatura: 'desc' }
            });

            return applications;

        } catch (error) {
            console.error("Erro ao buscar Candidaturas:", error);
            throw new Error("Falha ao buscar Candidaturas do usuário");
        }
    }
}

export { ListJobApplicationService };