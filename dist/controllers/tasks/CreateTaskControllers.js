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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskController = void 0;
const CreateTaskService_1 = require("../../services/tasks/CreateTaskService");
class CreateTaskController {
    constructor() {
        this.taskService = new CreateTaskService_1.CreateTaskService();
    }
    handle(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, priority, status, dateConclusion, activitys, userId } = request.body;
            if (!title) {
                return reply.status(400).send({ error: 'Defina um título' });
            }
            if (!priority) {
                return reply.status(400).send({ error: 'Defina uma descrição' });
            }
            if (!userId) {
                return reply.status(400).send({ error: 'Defina um ID de usuário' });
            }
            try {
                const task = yield this.taskService.execute({ title, priority, status, dateConclusion, activitys, userId });
                reply.status(201).send(task);
            }
            catch (error) {
                if (error.message === 'Usuário não encontrado') {
                    return reply.status(404).send({ error: 'Usuário não encontrado' });
                }
                console.error('Erro ao criar tarefa:', error); // Loga o erro para análise
                reply.status(500).send({ error: 'Erro ao criar tarefa' });
            }
        });
    }
}
exports.CreateTaskController = CreateTaskController;