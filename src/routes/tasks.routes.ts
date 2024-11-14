import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { ListTasksController } from "../controllers/tasks/ListTaskController";
import { DeleteTaskController } from "../controllers/tasks/DeleteTaskController";
import { UpdateTaskController } from "../controllers/tasks/UpdateTaskController";
import { CreateTaskController } from "../controllers/tasks/CreateTaskControllers";

export async function taskRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {

  fastify.get('/tasks/:userId', async (request: FastifyRequest<{ Params: { userId: string } }>, reply: FastifyReply) => {
    return new ListTasksController().handle(request, reply);
  });

  fastify.post('/createTask', async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateTaskController().handle(request, reply)
  })

  fastify.put('/updateTask', async (request: FastifyRequest, reply: FastifyReply) => {
    return new UpdateTaskController().handle(request, reply)
  })

  fastify.delete('/deleteTask/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    return new DeleteTaskController().handle(request, reply);
  });
}