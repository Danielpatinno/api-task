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
exports.UpdateUserController = void 0;
const UpdateUserService_1 = require("../../services/users/UpdateUserService");
class UpdateUserController {
    handle(request, // Tipagem explícita de Params e Body
    reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const { name, password } = request.body;
            const updateUserService = new UpdateUserService_1.UpdateUserService();
            try {
                const updatedUser = yield updateUserService.execute({
                    id,
                    name,
                    password,
                });
                reply.status(200).send(updatedUser);
            }
            catch (error) {
                reply.status(400).send({ errors: [error.message] });
            }
        });
    }
}
exports.UpdateUserController = UpdateUserController;
