import { UserBody } from "../../controllers/users/CreateuserController";
import prismaClient from "../../prisma";
import bcrypt from 'bcrypt';

class CreateUserService {
  async execute({ name, email, password }: UserBody) {
    try {
      // Gera o hash da senha para armazená-la de forma segura
      const hashedPassword = await bcrypt.hash(password, 10);

      // Cria um novo usuário no banco de dados com a senha hash
      const user = await prismaClient.user.create({
        data: {
          name,
          email,
          password: hashedPassword, // Armazena a senha hash em vez de texto simples
        },
      });

      return user;
    } catch (error: any) {
      // Lida com erros específicos do Prisma
      if (error.code === 'P2002' && error.meta?.target.includes('email')) { 
        // Verifica se o erro é de e-mail duplicado
        throw new Error('Email já cadastrado.');
      }

      console.error('Erro ao criar usuário no banco:', error); // Loga o erro para análise
      throw new Error('Erro ao criar usuário');
    }
  }
}

export { CreateUserService };
