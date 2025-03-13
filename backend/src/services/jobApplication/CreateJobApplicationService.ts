import prismaClient from "../../prisma";

interface JobApplicationRequest {
    userId: string;
    jobId: string;
}

class CreateJobApplicationService {
    async execute({ userId, jobId }: JobApplicationRequest) {
        const existingApplication = await prismaClient.application.findFirst({
            where: {
                AND: [
                    { usuario_Id: userId },
                    { job_Id: jobId }
                ]
            }
        });

        if (existingApplication) {
            throw new Error("Usuário já se candidatou a esta vaga");
        }

        const application = await prismaClient.application.create({
            data: {
                usuario_Id: userId,
                job_Id: jobId
            }
        });

        return application;
    }
}

export { CreateJobApplicationService };