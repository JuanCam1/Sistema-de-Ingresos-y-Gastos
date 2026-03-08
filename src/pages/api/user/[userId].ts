import { NextApiRequest, NextApiResponse } from "next";
import { withMethodRoles } from "@/lib/with-auth";
import { userController } from "@/server/controllers/user-controller";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "PUT") {
		return userController.updateUser(req, res);
	}

	res.status(405).json({ message: "Method not allowed" });
}

export default withMethodRoles(handler, {
	PUT: ["Administrador"],
});
