import { TaskBody } from "../../controllers/tasks/CreateTaskController";
import prismaClient from "../../prisma";

class CreateTaskService {
  async execute({ title, priority,status,dateConclusion,activitys, userId }: TaskBody) {
    // Verifica se o usuário existe antes de criar a tarefa
    const userExists = await prismaClient.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new Error('Usuário não encontrado');
    }

    // Cria a tarefa se o usuário existir
    const task = await prismaClient.task.create({
      data: {
        title,
        priority,
        dateConclusion,
        activitys,
        userId,
      },
    });

    return task;
  }
}

export { CreateTaskService };
