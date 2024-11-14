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
exports.DeleteTaskService = void 0;
// services/tasks/DeleteTaskService.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class DeleteTaskService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            const deletedTask = yield prisma.task.delete({
                where: { id },
            });
            return deletedTask;
        });
    }
}
exports.DeleteTaskService = DeleteTaskService;
