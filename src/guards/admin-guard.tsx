import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { Loading } from "@/components/shared/loading";

interface AdminGuardProps {
	children: ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
	const { data: session, isPending } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (!isPending && (!session || session.user.roleName !== "Administrador")) {
			router.replace("/home");
		}
	}, [session, isPending, router]);

	if (isPending || !session || session.user.roleName !== "Administrador") {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<Loading />
			</div>
		);
	}

	return <>{children}</>;
}
