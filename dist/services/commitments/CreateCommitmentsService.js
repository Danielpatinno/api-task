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
exports.CreateCommitmentsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateCommitmentsService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title, dateConclusion, userId }) {
            const userExists = yield prisma_1.default.user.findUnique({
                where: { id: userId },
            });
            if (!userExists) {
                throw new Error('Usuário não encontrado');
            }
            const commitment = yield prisma_1.default.commitment.create({
                data: {
                    title,
                    dateConclusion,
                    userId
                }
            });
            return commitment;
        });
    }
}
exports.CreateCommitmentsService = CreateCommitmentsService;
