"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("@fastify/cors"));
const user_routes_1 = require("./routes/user.routes");
const tasks_routes_1 = require("./routes/tasks.routes");
const dotenv_1 = __importDefault(require("dotenv"));
const commitments_routes_1 = require("./routes/commitments.routes");
const app = (0, fastify_1.default)({ logger: true });
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
app.register(cors_1.default, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type'],
});
app.register(user_routes_1.userRoutes);
app.register(tasks_routes_1.taskRoutes);
app.register(commitments_routes_1.commitmentsRoutes);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield app.listen({ port: 3000 });
        console.log('Server is running on http://localhost:3000');
    }
    catch (error) {
        app.log.error(error);
        process.exit(1);
    }
});
start();
