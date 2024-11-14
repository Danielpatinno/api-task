import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateUserService } from '../../services/users/CreateUserService';
import jwt from 'jsonwebtoken'

export interface UserBody {
  name: string;
  email: string;
  password: string;
}

class CreateUserController {
  private userService: CreateUserService;

  constructor(userService: CreateUserService = new CreateUserService()) {
    this.userService = userService;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = request.body as UserBody;

    // Validações de entrada
    if (!name) {
      return reply.status(400).send({ error: 'Defina um nome' });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return reply.status(400).send({ error: 'Email inválido' });
    }

    if (!password || password.length < 6) {
      return reply.status(400).send({ error: 'Senha deve ter pelo menos 6 caracteres' });
    }

    try {
      // Tenta criar o usuário através do serviço
      const userData = await this.userService.execute({ name, email, password });

      // Gera um token JWT
      const token = jwt.sign(
        { id: userData.id, email: userData.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '10d' } // Tempo de expiração do token
      );

      reply.status(201).send({ user: userData, token });
    } catch (error: any) {
      console.error('Erro ao criar usuário:', error); 
      reply.status(500).send({ error: 'Erro ao criar usuário' });
    }
  }
}

export { CreateUserController };
