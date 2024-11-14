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
exports.LoginUserService = void 0;
// src/services/users/LoginUserService.ts
const prisma_1 = __importDefault(require("../../prisma")); // Ajuste o caminho conforme necessário
const bcrypt_1 = __importDefault(require("bcrypt")); // Para comparar senhas
class LoginUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            // Buscar o usuário pelo email
            const user = yield prisma_1.default.user.findUnique({
                where: { email },
            });
            // Verificar se o usuário existe
            if (!user) {
                throw new Error('Usuário não encontrado');
            }
            // Comparar a senha fornecida com a senha armazenada
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Senha incorreta');
            }
            // Retornar dados do usuário ou gerar um token JWT aqui
            return { id: user.id, email: user.email, name: user.name }; // Exemplo: retornar o id e email
        });
    }
}
exports.LoginUserService = LoginUserService;
