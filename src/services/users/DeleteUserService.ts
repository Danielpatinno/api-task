import prismaClient from "../../prisma";

class DeleteUserService {
  async execute(id: string) {
    const user = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    await prismaClient.user.delete({
      where: { id },
    });

    return { message: "Usuário excluído com sucesso." };
  }
}

export { DeleteUserService };
