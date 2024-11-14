import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors';
import { userRoutes } from './routes/user.routes';
import { taskRoutes } from './routes/tasks.routes';
import dotenv from 'dotenv';
import { commitmentsRoutes } from './routes/commitments.routes';


const app = Fastify({ logger: true });
dotenv.config();
const prisma = new PrismaClient();

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type'],
});

app.register(userRoutes);
app.register(taskRoutes);
app.register(commitmentsRoutes);

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log('Server is running on http://localhost:3000');
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
