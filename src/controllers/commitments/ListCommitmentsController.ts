import { FastifyRequest, FastifyReply } from "fastify";
import { ListCommitmentsService } from "../../services/commitments/ListCommitmentsService";


class ListCommitmentsController {
  async handle(request: FastifyRequest<{ Params: { userId: string } }>, reply: FastifyReply) {
    const { userId } = request.params;

    if(!userId) {
      return reply.status(400).send({ error: 'User ID is required' });
    }

    const listCommitmentsService = new ListCommitmentsService();

    try {
      const commitments = await listCommitmentsService.execute(userId)
      return reply.status(200).send(commitments)
    } catch (error) {
      return reply.status(500).send({ error: 'Error fetching commitments' });
    }
  }
}

export { ListCommitmentsController }