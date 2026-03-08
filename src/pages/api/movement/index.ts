import { movementController } from "@/server/controllers/movement-controller";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "GET") {
		return movementController.getMovements(req, res);
	}

	res.status(405).end();
}
