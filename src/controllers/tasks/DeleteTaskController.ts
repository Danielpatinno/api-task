import { FastifyRequest, FastifyReply } from 'fastify';
import { DeleteTaskService } from "../../services/tasks/DeleteTaskService";

class DeleteTaskController {
  async handle(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = request.params;

    if (!id) {
      return reply.status(400).send({ message: 'ID is required' });
    }

    const taskService = new DeleteTaskService();

    try {
      await taskService.execute({ id });

      reply.status(204).send();
    } catch (error) {
      console.error('Error while deleting task:', error);
      reply.status(500).send({ message: 'An error occurred while deleting the task' });
    }
  }
}

export { DeleteTaskController };
