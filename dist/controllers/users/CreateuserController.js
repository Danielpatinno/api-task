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
exports.CreateUserController = void 0;
const CreateUserService_1 = require("../../services/users/CreateUserService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class CreateUserController {
    constructor(userService = new CreateUserService_1.CreateUserService()) {
        this.userService = userService;
    }
    handle(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = request.body;
            // Validações de entrada
            if (!name) {
                return reply.status(400).send({ error: 'Defina um nome' });
            }
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return reply.status(400).send({ error: 'Email inválido' });
            }
            if (!password || password.length < 6) {
                return reply.status(400).send({ error: 'Senha deve ter pelo menos 6 caracteres' });
            }
            try {
                // Tenta criar o usuário através do serviço
                const userData = yield this.userService.execute({ name, email, password });
                // Gera um token JWT
                const token = jsonwebtoken_1.default.sign({ id: userData.id, email: userData.email }, process.env.JWT_SECRET, { expiresIn: '10d' } // Tempo de expiração do token
                );
                reply.status(201).send({ user: userData, token });
            }
            catch (error) {
                console.error('Erro ao criar usuário:', error);
                reply.status(500).send({ error: 'Erro ao criar usuário' });
            }
        });
    }
}
exports.CreateUserController = CreateUserController;
