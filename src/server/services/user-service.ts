import { normalize } from "@/utils/normalize-text";
import { Prisma } from "../../../prisma/generated/prisma/browser";
import { userRepository } from "../repositories/user-repository";
import { UserFilters } from "../types/user-filter-type";

export const userService = {
	/**
	 * Consulta usuarios con filtros y paginacion.
	 * @param filters Filtros de busqueda (name, userId, page, perPage).
	 * @returns Objeto con usuarios y metadatos de paginacion.
	 */
	async getUsers(filters: UserFilters) {
		const page = filters.page ?? 1;
		const perPage = filters.perPage ?? 10;

		const where: Prisma.UserWhereInput = {};

		if (filters.name) {
			where.name = {
				contains: normalize(filters.name),
			};
		}

		if (filters.userId) {
			where.id = {
				equals: filters.userId,
			};
		}

		const finalWhere = Object.keys(where).length ? where : undefined;

		const total = await userRepository.count(finalWhere);

		if (page === 0 && perPage === 0) {
			const users = await userRepository.getUsers(finalWhere);

			return {
				data: users,
				meta: {
					total,
					page: 0,
					perPage: total,
					totalPages: 1,
				},
			};
		}

		const validPage = Math.max(1, page);
		const validPerPage = Math.max(1, perPage);

		const users = await userRepository.getUsers(
			finalWhere,
			validPage,
			validPerPage,
		);

		const totalPages = Math.max(1, Math.ceil(total / validPerPage));

		return {
			data: users,
			meta: {
				total,
				page: validPage,
				perPage: validPerPage,
				totalPages,
			},
		};
	},

	/**
	 * Obtiene el rol de un usuario por su ID.
	 * @param id ID del usuario.
	 * @returns Informacion del rol del usuario.
	 */
	async getRoleByIdUser(id: string) {
		return userRepository.getRoleByIdUser(id);
	},

	/**
	 * Actualiza datos de usuario (nombre y rol).
	 * @param userId ID del usuario a actualizar.
	 * @param data Datos del usuario (name, roleId).
	 * @returns Usuario actualizado.
	 */
	async updateUser(userId: string, data: { name: string; roleId: number }) {
		return userRepository.updateUser(userId, data);
	},
};
