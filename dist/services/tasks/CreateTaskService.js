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
exports.CreateTaskService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateTaskService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title, priority, status, dateConclusion, activitys, userId }) {
            // Verifica se o usuário existe antes de criar a tarefa
            const userExists = yield prisma_1.default.user.findUnique({
                where: { id: userId },
            });
            if (!userExists) {
                throw new Error('Usuário não encontrado');
            }
            // Cria a tarefa se o usuário existir
            const task = yield prisma_1.default.task.create({
                data: {
                    title,
                    priority,
                    dateConclusion,
                    activitys,
                    userId,
                },
            });
            return task;
        });
    }
}
exports.CreateTaskService = CreateTaskService;
