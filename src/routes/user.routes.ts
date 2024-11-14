import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateUserController } from "../controllers/users/CreateUserController";
import { LoginUserController } from "../controllers/users/LoginUserController";
import { ListUserController } from "../controllers/users/ListUserController";
import { UpdateUserController } from "../controllers/users/UpdateUserController";
import { DeleteUserController } from "../controllers/users/DeleteUserController";
import { authMiddleware } from "../middleware/authMiddleware";
import { getUserProfile } from "../controllers/users/getUserController";

interface UpdateUserParams {
  id: string;
}

interface UpdateUserBody {
  name?: string;
  password?: string;
}


export async function userRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post('/createUser', async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateUserController().handle(request, reply)
  })

  // fastify.get('/me', { preHandler: authMiddleware }, getUserProfile);

  fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    return new LoginUserController().handle(request, reply);
  });

  fastify.put('/updateUser/:id', async (request: FastifyRequest<{ Params: UpdateUserParams; Body: UpdateUserBody }>, reply: FastifyReply) => {
    return new UpdateUserController().handle(request, reply);
  });

  fastify.get('/users', async (request: FastifyRequest, reply:FastifyReply) => {
    return new ListUserController().handle(request,reply)
  })

  fastify.delete('/deleteUser/:id', async (request: FastifyRequest<{ Params: { id: string }}>, reply:FastifyReply) => {
    return new DeleteUserController().handle(request, reply);
  });

}