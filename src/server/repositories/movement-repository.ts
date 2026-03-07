import prisma from "@/lib/prisma"
import { Prisma } from "../../../prisma/generated/prisma/browser"

export const movementRepository = {

  async count(where?: Prisma.MovementWhereInput) {
    return prisma.movement.count({ where })
  },

  async getmovements(
    where: Prisma.MovementWhereInput | undefined,
    page: number,
    perPage: number
  ) {
    return prisma.movement.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
      select: {
        id: true,
        monto: true,
        fecha: true,
        type: {
            select: {
                id: true,
                name: true
            }
        },
        user: {
            select: {
                id: true,
                name: true
            }
        }
      },
    })
  }

}