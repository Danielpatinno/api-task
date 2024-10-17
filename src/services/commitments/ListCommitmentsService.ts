import prismaClient from "../../prisma";

class ListCommitmentService {
  async execute() {

    const commitments = await prismaClient.commitment.findMany()

    return commitments;
  }
}

export { ListCommitmentService }