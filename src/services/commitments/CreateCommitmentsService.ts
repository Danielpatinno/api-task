import prismaClient from "../../prisma";

export interface CommitmentProps {
  title: string
  dateConclusion: Date
}

class CreateCommitmentsService {
  async execute({title, dateConclusion}: CommitmentProps) {

    const commitment = await prismaClient.commitment.create({
      data: {
        title,
        dateConclusion
      }
    })

    return commitment
  }
}

export { CreateCommitmentsService }