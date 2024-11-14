import prismaClient from "../../prisma";

class ListTasksService {
  async execute(userId: string) {
    const tasks = await prismaClient.task.findMany({
      where: {
        userId: userId
      }
    });

    return tasks;
  }
}

export { ListTasksService };
