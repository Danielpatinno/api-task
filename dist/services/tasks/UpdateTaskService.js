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
exports.UpdateTaskService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateTaskService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, priority, dateConclusion, status, activityIndex, newActivity, }) {
            if (!id) {
                throw new Error("ID da tarefa é necessário.");
            }
            const task = yield prisma_1.default.task.findUnique({
                where: { id },
            });
            if (!task) {
                throw new Error("Tarefa não encontrada.");
            }
            if (task.activitys) {
                if (activityIndex !== undefined) {
                    if (newActivity) {
                        if (activityIndex >= 0 && activityIndex < task.activitys.length) {
                            task.activitys[activityIndex] = newActivity;
                        }
                        else {
                            throw new Error("Índice da atividade inválido.");
                        }
                    }
                    else {
                        if (activityIndex >= 0 && activityIndex < task.activitys.length) {
                            task.activitys.splice(activityIndex, 1);
                        }
                        else {
                            throw new Error("Índice da atividade inválido para remoção.");
                        }
                    }
                }
                else if (newActivity) {
                    task.activitys.push(newActivity);
                }
            }
            const updatedTask = yield prisma_1.default.task.update({
                where: { id },
                data: {
                    priority: priority !== null && priority !== void 0 ? priority : task.priority,
                    dateConclusion: dateConclusion !== null && dateConclusion !== void 0 ? dateConclusion : task.dateConclusion,
                    status: status !== null && status !== void 0 ? status : task.status,
                    activitys: task.activitys,
                },
            });
            return updatedTask;
        });
    }
}
exports.UpdateTaskService = UpdateTaskService;
