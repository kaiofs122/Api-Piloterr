import prismaClient from "../../prisma";
import bcrypt from "bcryptjs"; // 🔒 Para criptografar a senha

interface UserRequest {
    userId: string;
    nome?: string;
    email?: string;
    senha?: string;
}

class UpdateUserService {
    async execute({ userId, nome, email, senha }: UserRequest) {

        const userExists = await prismaClient.user.findUnique({
            where: { id: userId },
        });

        if (!userExists) {
            throw new Error("Usuário não encontrado.");
        }

        const dataToUpdate: any = {};

        if (nome) dataToUpdate.nome = nome;
        if (email) dataToUpdate.email = email;
        if (senha) {
            const salt = await bcrypt.genSalt(8);
            dataToUpdate.senha = await bcrypt.hash(senha, salt);
        }


        const updatedUser = await prismaClient.user.update({
            where: { id: userId },
            data: dataToUpdate,
            select: {
                id: true,
                nome: true,
                email: true,
            },
        });

        return updatedUser;
    }
}

export { UpdateUserService };
