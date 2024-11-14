import { FastifyRequest, FastifyReply } from 'fastify';


export const getUserProfile = async (
  request: FastifyRequest, 
  reply: FastifyReply
) => {
  const user = request.user;
  
  if (!user) {
    return reply.status(401).send({ message: 'User not authenticated' });
  }
  
  return reply.send({ user });
};
