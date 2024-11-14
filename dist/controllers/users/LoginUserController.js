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
exports.LoginUserController = void 0;
const LoginUserService_1 = require("../../services/users/LoginUserService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginUserController {
    constructor(loginService = new LoginUserService_1.LoginUserService()) {
        this.loginService = loginService;
    }
    handle(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = request.body;
            // Validação de entrada
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return reply.status(400).send({ error: 'Email inválido' });
            }
            if (!password) {
                return reply.status(400).send({ error: 'Defina uma senha' });
            }
            try {
                // Autentica o usuário
                const user = yield this.loginService.execute({ email, password });
                if (!user) {
                    return reply.status(401).send({ error: 'Credenciais inválidas' });
                }
                // Gera o token JWT
                const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '10d' });
                // Envia o token junto com os dados do usuário
                reply.status(200).send({ user, token });
            }
            catch (error) {
                console.error('Erro ao fazer login:', error);
                reply.status(500).send({ error: 'Erro ao fazer login' });
            }
        });
    }
}
exports.LoginUserController = LoginUserController;
