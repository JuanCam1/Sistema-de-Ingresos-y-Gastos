import { NextApiRequest, NextApiResponse } from "next";
import { withMethodRoles } from "@/lib/with-auth";
import { roleController } from "@/server/controllers/role-controller";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		return roleController.getRoles(req, res);
	}

	res.status(405).end();
}

export default withMethodRoles(handler, {
	GET: ["Administrador"],
});
