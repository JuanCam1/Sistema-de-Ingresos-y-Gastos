import { AuthenticatedRequest, withMethodRoles } from "@/lib/with-auth";
import { movementController } from "@/server/controllers/movement-controller";
import { NextApiResponse } from "next";

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		return movementController.getMovements(req, res);
	}

	if (req.method === "POST") {
		return movementController.createMovement(req, res);
	}

	res.status(405).end();
}

export default withMethodRoles(handler, {
	GET: ["Usuario", "Administrador"],
	POST: ["Administrador"],
});
