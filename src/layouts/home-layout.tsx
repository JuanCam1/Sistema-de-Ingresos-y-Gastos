import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/sidebar/app-sidebar";
import { ModeToggle } from "@/components/shared/toggle-theme";
import { useSession } from "@/lib/auth-client";
import { Loading } from "@/components/shared/loading";

interface Props {
	children: ReactNode;
}
export function HomeLayout({ children }: Props) {
	const { data: session, isPending } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (!session && !isPending) {
			router.replace("/");
		}
	}, [session, isPending, router]);

	if (isPending || !session) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-muted">
				<Loading />
			</div>
		);
	}
	const image = session.user.image || "/no-user.jpg";
	return (
		<SidebarProvider>
			<AppSidebar
				image={image}
				name={session.user.name}
				role={session.user.roleName || "Administrador"}
				roleId={session.user.roleId?.toString() || "2"}
			/>
			<main className="relative w-full bg-neutral-200 dark:bg-zinc-800">
				<div className="absolute top-0 right-0 p-2">
					<ModeToggle />
				</div>
				{children}
			</main>
		</SidebarProvider>
	);
}
