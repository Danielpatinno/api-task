import prismaClient from "../../prisma";

class ListUserService {
  async execute() {
    try {
      const users = await prismaClient.user.findMany();
      return users;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      throw new Error("Erro ao buscar usuários");
    }
  }
}

export { ListUserService };
