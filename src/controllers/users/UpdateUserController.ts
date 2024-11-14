import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateUserService } from "../../services/users/UpdateTaskService";


// Tipagem do request de maneira mais específica
interface UpdateUserParams {
  id: string;
}

interface UpdateUserBody {
  name?: string;
  password?: string;
}

class UpdateUserController {
  async handle(
    request: FastifyRequest<{ Params: UpdateUserParams; Body: UpdateUserBody }>, // Tipagem explícita de Params e Body
    reply: FastifyReply
  ) {
    const { id } = request.params;  
    const { name, password } = request.body;  

    const updateUserService = new UpdateUserService();

    try {
      const updatedUser = await updateUserService.execute({
        id,
        name,
        password,
      });

      reply.status(200).send(updatedUser);
    } catch (error: any) {
      reply.status(400).send({ errors: [error.message] });
    }
  }
}

export { UpdateUserController };
