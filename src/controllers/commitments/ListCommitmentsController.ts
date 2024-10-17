import { FastifyRequest, FastifyReply } from "fastify";
import { ListCommitmentService } from "../../services/commitments/listCommitmentsService";

class ListCommitmentController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listCommitmentService = new ListCommitmentService()

    const commitments = listCommitmentService.execute()

    return commitments;
  }
}

export { ListCommitmentController }