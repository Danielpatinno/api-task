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
exports.commitmentsRoutes = commitmentsRoutes;
const CreateCommitmentsController_1 = require("../controllers/commitments/CreateCommitmentsController");
const ListCommitmentsController_1 = require("../controllers/commitments/ListCommitmentsController");
const DeleteCommitmentController_1 = require("../controllers/commitments/DeleteCommitmentController");
function commitmentsRoutes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get('/commitments/:userId', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new ListCommitmentsController_1.ListCommitmentsController().handle(request, reply);
        }));
        fastify.post('/createCommitments', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new CreateCommitmentsController_1.CreateCommitmentsController().handle(request, reply);
        }));
        fastify.delete('/deleteCommit/:id', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new DeleteCommitmentController_1.DeleteCommitmentController().handle(request, reply);
        }));
    });
}
