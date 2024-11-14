import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface DeleteCommitmentRequest {
  id: string;
}

class DeleteCommitmentService {
  async execute({ id }: DeleteCommitmentRequest) {
    const deleteCommitment = await prisma.commitment.delete({
        where: { id }
    });

    return deleteCommitment
  }
}

export { DeleteCommitmentService }