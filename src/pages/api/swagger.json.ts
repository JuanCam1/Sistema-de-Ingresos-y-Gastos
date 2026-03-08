import { NextApiRequest, NextApiResponse } from "next";
import swaggerSpec from "@/lib/swagger.json";

export default function swaggerJsonHandler(
	_req: NextApiRequest,
	res: NextApiResponse,
) {
	res.setHeader("Content-Type", "application/json");
	res.status(200).json(swaggerSpec);
}
