import prismaClient from "../../prisma";
import bcrypt from "bcrypt";

interface UpdateUserProps {
  id: string;
  name?: string;
  password?: string;
}

class UpdateUserService {
  async execute({ id, name, password }: UpdateUserProps) {
    const user = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    // Validação para garantir que 'name' ou 'password' sejam preenchidos, se não, apenas o campo presente será atualizado
    if (name === undefined && password === undefined) {
      throw new Error("Pelo menos um dos campos 'name' ou 'password' deve ser fornecido.");
    }

    // Atualizando o nome, caso o 'name' tenha sido fornecido
    if (name) {
      user.name = name;
    }

    // Se o password foi fornecido, faz o hash e atualiza
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Atualiza o usuário no banco de dados
    const updatedUser = await prismaClient.user.update({
      where: { id },
      data: {
        name: user.name,
        password: user.password,
      },
    });

    return updatedUser;
  }
}

export { UpdateUserService };
