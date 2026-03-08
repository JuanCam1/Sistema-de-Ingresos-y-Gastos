import { NextApiRequest, NextApiResponse } from "next";
import { userController } from "@/server/controllers/user-controller";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "GET") {
		return userController.getUsers(req, res);
	}

	res.status(405).end();
}
