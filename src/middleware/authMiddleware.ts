// authMiddleware.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

export const authMiddleware = (request: FastifyRequest, reply: FastifyReply, done: Function) => {
  const token = request.headers['authorization']?.split(' ')[1]; // Pega o token Bearer

  if (!token) {
    return reply.status(401).send({ message: 'Token is required' });
  }

  try {
    // Verifica o token e decodifica
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    
    // Adiciona o usuário ao request
    request.user = { id: decoded.id, email: decoded.email };
    
    // Passa para o próximo handler
    done();
  } catch (error) {
    return reply.status(401).send({ message: 'Invalid token' });
  }
};
