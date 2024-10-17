import Fastify from "fastify";
import cors from '@fastify/cors'
import { taskRoutes } from "./routes/tasks.routes";
import { commitmentRoutes } from "./routes/commitments.routes";


const app = Fastify({ logger: true })

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message })
})

const start = async () => {
 
  await app.register(cors);
  await app.register(taskRoutes);
  await app.register(commitmentRoutes)

  
  try {
    await app.listen({ port: 3000 })
  } catch (err) {
    process.exit(1)
  }
}

start()