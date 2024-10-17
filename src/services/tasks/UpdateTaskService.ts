import prismaClient from "../../prisma";

interface UpdateTaskProps {
  id: string;
  priority?: string;
  dateConclusion?: Date;
  status?: string;
  activityIndex?: number;
  newActivity?: string;
}

class UpdateTaskService {
  async execute({ id, priority, dateConclusion, status, activityIndex, newActivity }: UpdateTaskProps) {
    if (!id) {
      throw new Error("ID da tarefa é necessário.");
    }

    const task = await prismaClient.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new Error("Tarefa não encontrada.");
    }

    if (task.activitys) {
      if (typeof activityIndex === 'number') {
        if (newActivity) {
          if (activityIndex >= 0 && activityIndex < task.activitys.length) {
            task.activitys[activityIndex] = newActivity;
          } else {
            throw new Error("Índice da atividade inválido.");
          }
        } else {
          if (activityIndex >= 0 && activityIndex < task.activitys.length) {
            task.activitys.splice(activityIndex, 1);
          } else {
            throw new Error("Índice da atividade inválido para remoção.");
          }
        }
      } else if (newActivity) {
        task.activitys.push(newActivity);
      }
    }

    const updatedTask = await prismaClient.task.update({
      where: { id },
      data: {
        priority: priority ?? task.priority,
        dateConclusion: dateConclusion ?? task.dateConclusion,
        status: status ?? task.status,
        activitys: task.activitys,
      },
    });

    return updatedTask;
  }
}

export { UpdateTaskService };
