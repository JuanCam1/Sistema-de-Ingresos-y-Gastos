import prisma from "@/lib/prisma"
import { Prisma } from "../../../prisma/generated/prisma/browser"

export const userRepository = {

  async count(where?: Prisma.UserWhereInput) {
    return prisma.user.count({ where })
  },

  async getUsers(
    where: Prisma.UserWhereInput | undefined,
    page: number,
    perPage: number
  ) {
    return prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
      select: {
        id: true,
        name: true,
        email: true,
        telephone: true,
        role: {
          select: {
            id: true,
            name: true
          }
        },
        state:{
          select: {
            id: true,
            name: true
          }
        },
      },
    })
  }

//   async getUserById(id: string) {
//     return prisma.user.findUnique({
//       where: { id }
//     })
//   },

//   async createUser(data: any) {
//     return prisma.user.create({
//       data
//     })
//   },

//   async updateUser(id: string, data: any) {
//     return prisma.user.update({
//       where: { id },
//       data
//     })
//   },

//   async deleteUser(id: string) {
//     return prisma.user.delete({
//       where: { id }
//     })
//   }

}