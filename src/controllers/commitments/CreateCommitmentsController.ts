import { FastifyRequest, FastifyReply } from "fastify";
import { CommitmentProps, CreateCommitmentsService } from "../../services/commitments/CreateCommitmentsService";

class CreateCommitmentController {
  async handle(request: FastifyRequest, reply:  FastifyReply) {
   
    const { title, dateConclusion } = request.body as CommitmentProps

    if(!title) {
      return reply.status(400).send({ error: 'Defina um título' });
    }

    if (dateConclusion && new Date(dateConclusion) < new Date()) {
        return reply.status(400).send({ error: 'Data inválida.' });
    }

    const commitmentService = new CreateCommitmentsService();
    const commitment = await commitmentService.execute({
        title, dateConclusion
    })

    reply.status(201).send(commitment)
  }
}

export { CreateCommitmentController }