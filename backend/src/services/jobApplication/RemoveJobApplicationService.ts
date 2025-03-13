import prismaClient from "../../prisma";

interface JobApplicationRequest{
    applicationId: string;
}

class RemoveJobApplicationService{

    async execute({applicationId}: JobApplicationRequest){
        
        const application = await prismaClient.application.delete({
            where: {
                id: applicationId
            }
        })

        return application;

    }

}

export { RemoveJobApplicationService }