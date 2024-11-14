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
exports.DeleteTaskController = void 0;
const DeleteTaskService_1 = require("../../services/tasks/DeleteTaskService");
class DeleteTaskController {
    handle(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            if (!id) {
                return reply.status(400).send({ message: 'ID is required' });
            }
            const taskService = new DeleteTaskService_1.DeleteTaskService();
            try {
                yield taskService.execute({ id });
                reply.status(204).send();
            }
            catch (error) {
                console.error('Error while deleting task:', error);
                reply.status(500).send({ message: 'An error occurred while deleting the task' });
            }
        });
    }
}
exports.DeleteTaskController = DeleteTaskController;
