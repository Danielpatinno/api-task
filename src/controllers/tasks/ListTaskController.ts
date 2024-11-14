import { FastifyRequest, FastifyReply } from 'fastify';
import { ListTasksService } from '../../services/tasks/ListTaskService';

class ListTasksController {
  async handle(request: FastifyRequest<{ Params: { userId: string } }>, reply: FastifyReply) {
    const { userId } = request.params;

    if (!userId) {
      return reply.status(400).send({ error: 'User ID is required' });
    }

    const listTasksService = new ListTasksService();

    try {
      const tasks = await listTasksService.execute(userId);
      return reply.status(200).send(tasks);
    } catch (error) {
      return reply.status(500).send({ error: 'Error fetching tasks' });
    }
  }
}

export { ListTasksController };
