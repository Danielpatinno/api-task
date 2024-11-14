import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateCommitmentsController } from "../controllers/commitments/CreateCommitmentsController";
import { ListCommitmentsController } from "../controllers/commitments/ListCommitmentsController";
import { DeleteCommitmentController } from "../controllers/commitments/DeleteCommitmentsController";


export async function commitmentsRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {

  fastify.get('/commitments/:userId', async (request: FastifyRequest<{ Params: { userId: string } }>, reply: FastifyReply) => {
    return new ListCommitmentsController().handle(request, reply);
  });

  fastify.post('/createCommitments', async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateCommitmentsController().handle(request, reply)
  })

  fastify.delete('/deleteCommit/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    return new DeleteCommitmentController().handle(request, reply);
  });

}