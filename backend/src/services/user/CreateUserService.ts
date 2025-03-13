import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';

interface UserRequest {
    nome: string;
    email: string;
    senha: string;
}

class CreateUserService {

    async execute({nome, email, senha}: UserRequest) {     
        
        if(!email) {
            throw new Error('Email Incorreto');
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(userAlreadyExists) {
            throw new Error('O Usuário já existe');
        }

        const passwordHash = await hash(senha, 8);

        const user = await prismaClient.user.create({
            data: {
                nome: nome,
                email: email,
                senha: passwordHash
            },
            select: {
                id: true,
                nome: true,
                email: true
            }
        })

        return user;
    }
}

export { CreateUserService }