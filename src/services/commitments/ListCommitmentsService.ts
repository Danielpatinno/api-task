import prismaClient from "../../prisma";

class ListCommitmentsService {
  async execute(userId:string) {
    const commitments = await prismaClient.commitment.findMany({
      where: {
        userId: userId
      }
    })

    return commitments;
  }
}

export { ListCommitmentsService }