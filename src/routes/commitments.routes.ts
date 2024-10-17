import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify"
import { CreateCommitmentController } from "../controllers/commitments/CreateCommitmentsController"
import { ListCommitmentController } from "../controllers/commitments/ListCommitmentsController"
import { DeleteCommitmentController } from "../controllers/commitments/DeleteCommitmentController"


export async function commitmentRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get('/commitments', async(request: FastifyRequest, reply:FastifyReply) => {
      return new ListCommitmentController().handle( request,reply )
    })

    fastify.post('/createCommitment', async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateCommitmentController().handle(request, reply)
    })

    fastify.delete('/deleteCommitment', async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteCommitmentController().handle(request, reply)
      })
    

  }