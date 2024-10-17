import prismaClient from "../../prisma"

interface DeleteCommitmentProps {
  id: string
}

class DeleteCommitmentService{
  async execute({ id }: DeleteCommitmentProps) {
    if(!id){
        throw new Error("Solicitação inválida")
    }

    const findCommitment = await prismaClient.commitment.findFirst({
      where: {
        id: id
      }
    })

    if(!findCommitment) {
        throw new Error("Tarefa não encontrada.")
    }

    await prismaClient.commitment.delete({
      where: {
        id: findCommitment.id
      }
    })

    return { message: "Deletado com sucesso."}

  }
}

export { DeleteCommitmentService }