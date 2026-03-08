import { roleController } from "@/server/controllers/role-controller";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "GET") {
		return roleController.getRoles(req, res);
	}

	res.status(405).end();
}
