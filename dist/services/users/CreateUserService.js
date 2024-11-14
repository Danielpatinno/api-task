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
exports.CreateUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class CreateUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password }) {
            var _b;
            try {
                // Gera o hash da senha para armazená-la de forma segura
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                // Cria um novo usuário no banco de dados com a senha hash
                const user = yield prisma_1.default.user.create({
                    data: {
                        name,
                        email,
                        password: hashedPassword, // Armazena a senha hash em vez de texto simples
                    },
                });
                return user;
            }
            catch (error) {
                // Lida com erros específicos do Prisma
                if (error.code === 'P2002' && ((_b = error.meta) === null || _b === void 0 ? void 0 : _b.target.includes('email'))) {
                    // Verifica se o erro é de e-mail duplicado
                    throw new Error('Email já cadastrado.');
                }
                console.error('Erro ao criar usuário no banco:', error); // Loga o erro para análise
                throw new Error('Erro ao criar usuário');
            }
        });
    }
}
exports.CreateUserService = CreateUserService;
