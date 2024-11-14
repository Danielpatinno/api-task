import { CommitmentsBody } from "../../controllers/commitments/CreateCommitmentsController";
import prismaClient from "../../prisma";

class CreateCommitmentsService {
  async execute({ title, dateConclusion, userId }: CommitmentsBody) {

    const userExists = await prismaClient.user.findUnique({
        where: { id: userId},
    })

    if (!userExists) {
      throw new Error('Usuário não encontrado');
    }

    const commitment = await prismaClient.commitment.create({
      data: {
        title,
        dateConclusion,
        userId
      }
    })

    return commitment;
  }
}

export { CreateCommitmentsService }