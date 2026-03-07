import { Prisma } from "../../../prisma/generated/prisma/browser"
import { movementRepository } from "../repositories/movement-repository"
import { MovementFilters } from "../types/movement-filter-type"

export const movementService = {

  async getMovements(filters: MovementFilters) {
    const page = Math.max(1, filters.page || 1)
    const perPage = Math.max(1, filters.perPage || 10)

    const where: Prisma.MovementWhereInput = {}

    if (filters.typeMovement) {
      where.typeId = {
        equals: Number(filters.typeMovement)
      }
    }

    if (filters.idUser) {
      where.userId = {
        equals: Number(filters.idUser)
      }
    }

    const finalWhere = Object.keys(where).length ? where : undefined

    const total = await movementRepository.count(finalWhere)

    const movements = await movementRepository.getmovements(
      finalWhere,
      page,
      perPage
    )

    const totalPages = Math.max(1, Math.ceil(total / perPage))

    return {
      data: movements,
      meta: {
        total,
        page,
        perPage,
        totalPages
      }
    }
  },

}