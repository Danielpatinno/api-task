import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreaterTaskController } from "../controllers/tasks/CreateTaskControllers";
import { ListTaskController } from "../controllers/tasks/ListTaskController";
import { DeleteTaskController } from "../controllers/tasks/DeleteTaskController";
import { UpdateTaskController } from "../controllers/tasks/UpdateTaskController";

export async function taskRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/tasks', async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListTaskController().handle(request, reply)
  })

  fastify.post("/createTask", async (request:FastifyRequest, reply: FastifyReply) => {
    return new CreaterTaskController().handle(request, reply)
  })

  fastify.delete('/deleteTask', async (request: FastifyRequest, reply: FastifyReply) => {
    return new DeleteTaskController().handle(request, reply)
  })

  fastify.put('/updateTask', async (request: FastifyRequest, reply: FastifyReply) => {
    return new UpdateTaskController().handle(request, reply)
  })
}