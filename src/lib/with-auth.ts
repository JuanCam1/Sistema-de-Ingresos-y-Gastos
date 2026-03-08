import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import prisma from "./prisma";
import { Role } from "../../prisma/generated/prisma/client";

export interface AuthenticatedRequest extends NextApiRequest {
	user: {
		id: string;
		name: string;
		email: string;
		image: string;
		telephone: string | null;
		role: Role;
	};
}

type ApiHandler = (
	req: AuthenticatedRequest,
	res: NextApiResponse,
) => Promise<void> | void;

/**
 * Middleware de autenticación y autorización
 * @param handler Función que maneja la request si pasa la autenticación
 * @param methodRoles Objeto con métodos y roles permitidos
 */
export function withMethodRoles(
	handler: ApiHandler,
	methodRoles?: { [method: string]: string[] },
) {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			const session = await auth.api.getSession({
				headers: fromNodeHeaders(req.headers),
			});

			if (!session) return res.status(401).json({ error: "No autenticado" });

			const user = await prisma.user.findUnique({
				where: { id: session.user.id },
				include: { role: true },
			});

			if (!user)
				return res.status(403).json({ error: "Usuario no encontrado" });

			const allowedRoles = methodRoles?.[req.method || ""];
			if (allowedRoles && !allowedRoles.includes(user.role.name)) {
				return res.status(403).json({ error: "No tiene permisos suficientes" });
			}

			(req as AuthenticatedRequest).user = {
				id: user.id,
				name: user.name,
				image: user.image,
				telephone: user.telephone || null,
				email: user.email,
				role: user.role,
			};

			return handler(req as AuthenticatedRequest, res);
		} catch (error) {
			console.error("Error in withMethodRoles:", error);
			return res.status(401).json({ error: "Error de autenticación" });
		}
	};
}

// export function withAuth(
// 	handler: ApiHandler,
// 	allowedRoles?: Pick<Role, "name">[],
// ) {
// 	return async (req: NextApiRequest, res: NextApiResponse) => {
// 		try {
// 			const session = await auth.api.getSession({
// 				headers: fromNodeHeaders(req.headers),
// 			});

// 			if (!session) {
// 				return res.status(401).json({ error: "No autenticado" });
// 			}

// 			const user = await prisma.user.findUnique({
// 				where: { id: session.user.id },
// 				include: { role: true },
// 			});

// 			if (!user) {
// 				return res
// 					.status(403)
// 					.json({ error: "Usuario no encontrado en el sistema" });
// 			}

// 			if (
// 				allowedRoles &&
// 				!allowedRoles.some((role) => role.name === user.role.name)
// 			) {
// 				return res.status(403).json({ error: "No tiene permisos suficientes" });
// 			}

// 			const authenticatedReq = req as AuthenticatedRequest;
// 			authenticatedReq.user = {
// 				id: user.id,
// 				name: user.name,
// 				email: user.email,
// 				image: user.image,
// 				role: user.role,
// 			};

// 			return handler(authenticatedReq, res);
// 		} catch {
// 			return res.status(401).json({ error: "Error de autenticacion" });
// 		}
// 	};
// }
