import { typeMovementController } from "@/server/controllers/type-movement-controller";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "GET") {
		return typeMovementController.getTypeMovements(req, res);
	}

	res.status(405).end();
}
