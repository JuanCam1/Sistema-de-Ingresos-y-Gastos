import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { ArrowBigLeftDash } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/sidebar/app-sidebar";
import { ModeToggle } from "@/components/shared/toggle-theme";
import { useSession } from "@/lib/auth-client";

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
				<p className="text-muted-foreground">Cargando...</p>
			</div>
		);
	}
	const image = session.user.image || "/no-user.jpg";
	return (
		<SidebarProvider>
			<AppSidebar
				image={image}
				name={session.user.name}
				role={session.user.roleName}
				roleId={session.user.roleId}
			/>
			<main className="relative w-full bg-neutral-200 dark:bg-zinc-800">
				<div className="absolute top-0 left-0 p-2">
					<button
						type="button"
						className="group dark:bg-slate-900 w-9 h-9 flex items-center justify-center rounded-sm cursor-pointer transition-colors duration-200 bg-white  hover:bg-neutral-200 shadow-md"
					>
						<ArrowBigLeftDash className="dark:text-white w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
					</button>
				</div>
				<div className="absolute top-0 right-0 p-2">
					<ModeToggle />
				</div>
				{children}
			</main>
		</SidebarProvider>
	);
}
