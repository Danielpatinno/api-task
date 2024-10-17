import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateTaskService } from "../../services/tasks/UpdateTaskService";

class UpdateTaskController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string };
    const { priority, dateConclusion, status, activityIndex, newActivity } = request.body as {
      priority?: string;
      dateConclusion?: Date;
      status?: string;
      activityIndex?: number;
      newActivity?: string;
    };
  
    const updateTaskService = new UpdateTaskService();
  
    try {
      const updatedTask = await updateTaskService.execute({
        id,
        priority,
        dateConclusion,
        status,
        activityIndex,
        newActivity,
      });
  
      reply.status(200).send(updatedTask);
    } catch (error: any) {
      reply.status(400).send({ errors: [error.message] });
    }
  }
}

export { UpdateTaskController };
