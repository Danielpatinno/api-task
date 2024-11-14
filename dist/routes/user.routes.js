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
exports.userRoutes = userRoutes;
const CreateuserController_1 = require("../controllers/users/CreateuserController");
const LoginUserController_1 = require("../controllers/users/LoginUserController");
const ListUserController_1 = require("../controllers/users/ListUserController");
const UpdateUserController_1 = require("../controllers/users/UpdateUserController");
const DeleteUserController_1 = require("../controllers/users/DeleteUserController");
function userRoutes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.post('/createUser', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new CreateuserController_1.CreateUserController().handle(request, reply);
        }));
        fastify.post('/login', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new LoginUserController_1.LoginUserController().handle(request, reply);
        }));
        fastify.put('/updateUser/:id', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new UpdateUserController_1.UpdateUserController().handle(request, reply);
        }));
        fastify.get('/users', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new ListUserController_1.ListUserController().handle(request, reply);
        }));
        fastify.delete('/deleteUser/:id', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new DeleteUserController_1.DeleteUserController().handle(request, reply);
        }));
    });
}
