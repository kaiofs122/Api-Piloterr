import prismaClient from "../../prisma";

class DetailUserService {    
    async execute(userId: string) {

        const user = await prismaClient.user.findFirst({
            where: {
                id: userId
            },
            select:{
                id: true,
                nome: true,
                email: true
            }
        });

        return user;
   }   
}

export { DetailUserService }