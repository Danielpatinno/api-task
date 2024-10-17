import { FastifyRequest, FastifyReply } from "fastify";
import { ListTasksService } from "../../services/tasks/ListTasksService";

class ListTaskController{
  async handle(request: FastifyRequest, reply: FastifyReply){
    const listTasksService = new ListTasksService();

    const tasks = await listTasksService.execute()

    return tasks
  }
}

export { ListTaskController }