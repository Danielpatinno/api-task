import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateTaskService } from '../../services/tasks/CreateTaskService';

export interface TaskBody {
  title: string;
  priority: string;
  status: string;
  dateConclusion: Date;
  activitys: string[];
  userId: string;
}

class CreateTaskController {
  private taskService: CreateTaskService;

  constructor() {
    this.taskService = new CreateTaskService();
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { title, priority,status,dateConclusion,activitys,  userId } = request.body as TaskBody;

    if (!title) {
      return reply.status(400).send({ error: 'Defina um título' });
    }

    if (!priority) {
      return reply.status(400).send({ error: 'Defina uma descrição' });
    }

    if (!userId) {
      return reply.status(400).send({ error: 'Defina um ID de usuário' });
    }

    try {
      const task = await this.taskService.execute({ title, priority,status,dateConclusion,activitys, userId });
      reply.status(201).send(task);
    } catch (error: any) {
      if (error.message === 'Usuário não encontrado') {
        return reply.status(404).send({ error: 'Usuário não encontrado' });
      }
      console.error('Erro ao criar tarefa:', error); // Loga o erro para análise
      reply.status(500).send({ error: 'Erro ao criar tarefa' });
    }
  }
}

export { CreateTaskController };
