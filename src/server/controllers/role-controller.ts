import { NextApiRequest, NextApiResponse } from "next";
import { roleService } from "../services/role-service";

export const roleController = {
	async getRoles(req: NextApiRequest, res: NextApiResponse) {
		const result = await roleService.getRoles();
		res.status(200).json(result);
	},
};
