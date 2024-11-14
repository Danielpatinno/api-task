import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCommitmentsService } from "../../services/commitments/CreateCommitmentsService";

export interface CommitmentsBody {
  title: string;
  dateConclusion: Date;
  userId: string; 
}

class CreateCommitmentsController {
    private commitmentsService: CreateCommitmentsService;
  
    constructor() {
      this.commitmentsService = new CreateCommitmentsService();
    }
  
    async handle(request: FastifyRequest, reply: FastifyReply) {
      const { title, dateConclusion, userId } = request.body as CommitmentsBody;
  
      if (!title) {
        return reply.status(400).send({ error: 'Defina um título' });
      }
  
      if (!userId) {
        return reply.status(400).send({ error: 'Defina um ID de usuário' });
      }
  
      try {
        const commitments = await this.commitmentsService.execute({ title,dateConclusion, userId });
        reply.status(201).send(commitments);
      } catch (error: any) {
        if (error.message === 'Usuário não encontrado') {
          return reply.status(404).send({ error: 'Usuário não encontrado' });
        }
        console.error('Erro ao criar tarefa:', error); // Loga o erro para análise
        reply.status(500).send({ error: 'Erro ao criar tarefa' });
      }
    }
  }
  
  export { CreateCommitmentsController };
  