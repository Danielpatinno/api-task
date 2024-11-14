// src/services/users/LoginUserService.ts
import prismaClient from '../../prisma'; // Ajuste o caminho conforme necessário
import bcrypt from 'bcrypt'; // Para comparar senhas

interface LoginUserRequest {
  email: string;
  password: string;
}

class LoginUserService {
  async execute({ email, password }: LoginUserRequest) {
    // Buscar o usuário pelo email
    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    // Verificar se o usuário existe
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Comparar a senha fornecida com a senha armazenada
    const isPasswordValid = await bcrypt.compare(password, user.password);


    if (!isPasswordValid) {
      throw new Error('Senha incorreta');
    }

    // Retornar dados do usuário ou gerar um token JWT aqui
    return { id: user.id, email: user.email, name: user.name }; // Exemplo: retornar o id e email
  }
}

export { LoginUserService };
