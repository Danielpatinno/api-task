// services/tasks/DeleteTaskService.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface DeleteTaskRequest {
  id: string;
}

class DeleteTaskService {
  async execute({ id }: DeleteTaskRequest) {
    const deletedTask = await prisma.task.delete({
      where: { id },
    });

    return deletedTask;
  }
}

export { DeleteTaskService };
