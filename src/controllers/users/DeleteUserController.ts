import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteUserService } from "../../services/users/DeleteUserService";

class DeleteUserController {
  async handle(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = request.params; 

    const deleteUserService = new DeleteUserService();

    try {
      const response = await deleteUserService.execute(id);
      reply.status(200).send(response);
    } catch (error: any) {
      reply.status(400).send({ errors: [error.message] });
    }
  }
}

export { DeleteUserController };
