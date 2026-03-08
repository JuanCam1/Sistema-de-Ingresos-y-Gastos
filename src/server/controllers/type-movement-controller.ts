import { NextApiRequest, NextApiResponse } from "next";
import { typeMovementService } from "../services/type-movement-service";

export const typeMovementController = {
	async getTypeMovements(req: NextApiRequest, res: NextApiResponse) {
		const result = await typeMovementService.getTypeMovements();
		res.status(200).json(result);
	},
};
