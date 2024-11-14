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
exports.UpdateTaskController = void 0;
const UpdateTaskService_1 = require("../../services/tasks/UpdateTaskService");
class UpdateTaskController {
    handle(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.query;
            const { priority, dateConclusion, status, activityIndex, newActivity } = request.body;
            const updateTaskService = new UpdateTaskService_1.UpdateTaskService();
            try {
                const updatedTask = yield updateTaskService.execute({
                    id,
                    priority,
                    dateConclusion,
                    status,
                    activityIndex,
                    newActivity,
                });
                reply.status(200).send(updatedTask);
            }
            catch (error) {
                reply.status(400).send({ errors: [error.message] });
            }
        });
    }
}
exports.UpdateTaskController = UpdateTaskController;
