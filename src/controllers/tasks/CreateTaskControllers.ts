import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateTaskService } from '../../services/tasks/CreateTaskService';

export interface TaskBody {
  title: string;
  priority: string;
  status: string;
  dateConclusion?: Date;
  activitys: string[];
}

class CreaterTaskController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { title, priority, status, dateConclusion, activitys } = request.body as TaskBody;

    if (!title) {
      return reply.status(400).send({ error: 'Defina um título' });
    }

    if (!priority) {
      return reply.status(400).send({ error: 'Defina a prioridade' });
    }

    if (dateConclusion && new Date(dateConclusion) < new Date()) {
      return reply.status(400).send({ error: 'Data inválida.' });
    }

    const taskService = new CreateTaskService();
    const task = await taskService.execute({ title, priority, status, dateConclusion, activitys });

    reply.status(201).send(task);
  }
}

export { CreaterTaskController };
