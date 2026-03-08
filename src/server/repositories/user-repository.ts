import prisma from "@/lib/prisma";
import { Prisma } from "../../../prisma/generated/prisma/browser";

export const userRepository = {
	/**
	 * Cuenta usuarios segun condiciones.
	 * @param where Filtros de busqueda Prisma.
	 * @returns Cantidad de usuarios.
	 */
	async count(where?: Prisma.UserWhereInput) {
		return prisma.user.count({ where });
	},

	/**
	 * Consulta usuarios con paginacion y relacion role.
	 * @param where Filtros de busqueda Prisma.
	 * @param page Numero de pagina (opcional).
	 * @param perPage Registros por pagina (opcional).
	 * @returns Array de usuarios con role.
	 */
	async getUsers(
		where?: Prisma.UserWhereInput,
		page?: number,
		perPage?: number,
	) {
		return prisma.user.findMany({
			where,
			orderBy: { createdAt: "desc" },

			...(page && perPage
				? {
						skip: (page - 1) * perPage,
						take: perPage,
					}
				: {}),

			select: {
				id: true,
				name: true,
				email: true,
				telephone: true,
				image: true,
				role: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});
	},

	/**
	 * Obtiene el rol de un usuario por su ID.
	 * @param id ID del usuario.
	 * @returns Objeto con informacion del rol.
	 */
	async getRoleByIdUser(id: string) {
		return prisma.user.findFirst({
			where: { id },
			select: {
				role: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});
	},

	/**
	 * Actualiza nombre y rol de un usuario.
	 * @param id ID del usuario.
	 * @param data Datos a actualizar (name, roleId).
	 * @returns Usuario actualizado con role.
	 */
	async updateUser(id: string, data: { name: string; roleId: number }) {
		return prisma.user.update({
			where: { id },
			data: {
				name: data.name,
				roleId: data.roleId,
			},
			select: {
				id: true,
				name: true,
				email: true,
				role: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});
	},
};
