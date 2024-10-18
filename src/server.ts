import Fastify from "fastify";
import cors from '@fastify/cors';
import { taskRoutes } from "./routes/tasks.routes";
import { commitmentRoutes } from "./routes/commitments.routes";

const app = Fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type'],
});

app.register(taskRoutes);
app.register(commitmentRoutes);

const start = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
