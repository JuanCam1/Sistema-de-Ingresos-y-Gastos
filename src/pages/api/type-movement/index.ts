import { NextApiRequest, NextApiResponse } from "next";
import { withMethodRoles } from "@/lib/with-auth";
import { typeMovementController } from "@/server/controllers/type-movement-controller";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		return typeMovementController.getTypeMovements(req, res);
	}

	res.status(405).end();
}

export default withMethodRoles(handler, {
	GET: ["Administrador"],
});
