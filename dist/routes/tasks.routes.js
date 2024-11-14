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
exports.taskRoutes = taskRoutes;
const ListTaskController_1 = require("../controllers/tasks/ListTaskController");
const DeleteTaskController_1 = require("../controllers/tasks/DeleteTaskController");
const UpdateTaskController_1 = require("../controllers/tasks/UpdateTaskController");
const CreateTaskControllers_1 = require("../controllers/tasks/CreateTaskControllers");
function taskRoutes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get('/tasks/:userId', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new ListTaskController_1.ListTasksController().handle(request, reply);
        }));
        fastify.post('/createTask', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new CreateTaskControllers_1.CreateTaskController().handle(request, reply);
        }));
        fastify.put('/updateTask', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new UpdateTaskController_1.UpdateTaskController().handle(request, reply);
        }));
        fastify.delete('/deleteTask/:id', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new DeleteTaskController_1.DeleteTaskController().handle(request, reply);
        }));
    });
}
