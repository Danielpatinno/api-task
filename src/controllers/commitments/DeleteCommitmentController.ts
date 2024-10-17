import { FastifyRequest, FastifyReply } from "fastify"
import { DeleteCommitmentService } from "../../services/commitments/DeleteCommitmentService";

class DeleteCommitmentController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string }

    const commitmentService = new DeleteCommitmentService();

    const commitment = await commitmentService.execute({ id })

    reply.send(commitment)
  }
}

export { DeleteCommitmentController }