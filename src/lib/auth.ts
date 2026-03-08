import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { customSession } from "better-auth/plugins";
import prisma from "./prisma";
import { config } from "dotenv";
config({ path: ".env.local" });

export const auth = betterAuth({
	secret: process.env.BETTER_AUTH_SECRET!,
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
		},
	},
	session: {
		expiresIn: 60 * 60 * 24 * 7,
		updateAge: 60 * 60 * 24,
	},
	plugins: [
		customSession(async ({ user, session }) => {
			const userRole = await prisma.user.findFirst({
				where: { id: user.id },
				select: {
					role: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			});
			return {
				user: {
					...user,
					roleId: userRole?.role.id,
					roleName: userRole?.role?.name,
				},
				session,
			};
		}),
	],
	callbacks: {
		async onUserCreated(user: {
			id: string;
			name?: string;
			email: string;
			image: string;
		}) {
			const newUser = await prisma.user.create({
				data: {
					name: user.name || user.email.split("@")[0],
					email: user.email,
					image: user.image || "",
				},
			});

			const expiresAt = new Date();
			expiresAt.setDate(expiresAt.getDate() + 7);

			return newUser;
		},
	},
});

type Session = typeof auth.$Infer.Session;

export type AuthenticatedSession = Session & {
	user: Session & {
		roleId?: number;
		roleName?: string;
	};
};
