import { NextApiRequest, NextApiResponse } from "next";
import { roleService } from "../services/role-service";

export const roleController = {
	/**
	 * Obtiene todos los roles disponibles en el sistema.
	 * @param req Request de Next.js.
	 * @param res Response de Next.js.
	 * @returns Respuesta HTTP con listado de roles.
	 */
	async getRoles(req: NextApiRequest, res: NextApiResponse) {
		const result = await roleService.getRoles();
		res.status(200).json(result);
	},
};
