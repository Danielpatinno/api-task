import { TaskBody } from "../../controllers/tasks/CreateTaskControllers";
import prismaClient from "../../prisma";

class CreateTaskService {
  async execute ({ title, priority, status, dateConclusion, activitys}: TaskBody) {
 
    const task = await prismaClient.task.create({
      data: {
        title,
        priority,
        status,
        dateConclusion,
        activitys
      }
    })

    return task
  }
}

export { CreateTaskService }