import { FastifyRequest, FastifyReply } from "fastify";
import { ListUserService } from "../../services/users/ListUserService";


class ListUserController{
  async handle(request:FastifyRequest, reply: FastifyReply) {
    const listUserService = new ListUserService();

    const users = await listUserService.execute()

    return users
  }
}

export { ListUserController }