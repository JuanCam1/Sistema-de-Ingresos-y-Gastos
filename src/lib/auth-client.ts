import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const authClient = createAuthClient({
	baseURL:
		typeof window !== "undefined"
			? window.location.origin
			: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
	plugins: [inferAdditionalFields<typeof auth>()],
});

export const { signIn, signOut } = authClient;

type BaseSession = typeof auth.$Infer.Session;
type AppSession = BaseSession & {
	user: BaseSession["user"] & {
		roleId?: number;
		roleName?: string;
	};
};

export const useSession = () => {
	const session = authClient.useSession();
	return {
		...session,
		data: session.data as AppSession | null,
	};
};
