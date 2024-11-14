// services/tasks/FindTaskService.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface FindTaskRequest {
  id: string;
}

class FindTaskService {
  async execute({ id }: FindTaskRequest) {
    // Busca a tarefa pelo ID no banco de dados
    const task = await prisma.task.findUnique({
      where: { id },
    });

    return task;
  }
}

export { FindTaskService };
