import { NextApiRequest, NextApiResponse } from "next";
import { typeMovementService } from "../services/type-movement-service";

export const typeMovementController = {
	/**
	 * Obtiene tipos de movimiento disponibles (Ingreso/Egreso).
	 * @param req Request de Next.js.
	 * @param res Response de Next.js.
	 * @returns Respuesta HTTP con tipos de movimiento.
	 */
	async getTypeMovements(req: NextApiRequest, res: NextApiResponse) {
		const result = await typeMovementService.getTypeMovements();
		res.status(200).json(result);
	},
};
