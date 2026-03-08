import { NextApiRequest, NextApiResponse } from "next";
import { userService } from "../services/user-service";
import { UserFilters } from "../types/user-filter-type";

export const userController = {
	/**
	 * Lista usuarios segun filtros de query y reglas por rol.
	 * @param req Request de Next.js con query params (`name`, `page`, `perPage`, `roleId`, `userId`).
	 * @param res Response de Next.js.
	 * @returns Respuesta HTTP con usuarios paginados o error.
	 */
	async getUsers(req: NextApiRequest, res: NextApiResponse) {
		const filters: UserFilters = {
			name: req.query.name as string,
			page: parseInt((req.query.page as string) || "1", 10),
			perPage: parseInt((req.query.perPage as string) || "10", 10),
		};

		if (req.query.roleId == "1") {
			if (!req.query.userId) {
				res.status(400).json({ message: "Missing userId query parameter" });
			}
			filters.userId = req.query.userId as string;
		}

		try {
			const result = await userService.getUsers(filters);
			res.status(200).json(result);
		} catch (error) {
			res.status(500).json({ message: "Error fetching users", error });
		}
	},

	/**
	 * Obtiene el rol de un usuario por su ID.
	 * @param req Request de Next.js con `userId` en query.
	 * @param res Response de Next.js.
	 * @returns Respuesta HTTP con informacion del rol o error.
	 */
	async getRoleByIdUser(req: NextApiRequest, res: NextApiResponse) {
		const userId = req.query.userId as string;

		if (!userId) {
			res.status(400).json({ message: "Missing userId query parameter" });
			return;
		}

		try {
			const result = await userService.getRoleByIdUser(userId);
			res.status(200).json(result);
		} catch (error) {
			res.status(500).json({ message: "Error fetching user role", error });
		}
	},

	/**
	 * Actualiza datos del usuario (nombre y rol).
	 * @param req Request de Next.js con `userId` en path/query y `name`/`roleId` en body.
	 * @param res Response de Next.js.
	 * @returns Respuesta HTTP con usuario actualizado o error de validacion/persistencia.
	 */
	async updateUser(req: NextApiRequest, res: NextApiResponse) {
		const { userId } = req.query;
		const { name, roleId } = req.body as {
			name?: string;
			roleId?: number | string;
		};

		if (!name || roleId === undefined || roleId === null || roleId === "") {
			return res.status(400).json({
				message: "Missing required fields: name and roleId",
			});
		}

		if (!userId || Array.isArray(userId)) {
			return res.status(400).json({ message: "Invalid userId" });
		}

		const parsedRoleId = Number(roleId);
		if (Number.isNaN(parsedRoleId)) {
			return res.status(400).json({ message: "roleId must be a number" });
		}

		try {
			const result = await userService.updateUser(userId, {
				name,
				roleId: parsedRoleId,
			});

			return res.status(200).json(result);
		} catch (error) {
			return res.status(500).json({ message: "Error updating user", error });
		}
	},
};
