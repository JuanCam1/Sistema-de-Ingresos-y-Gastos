"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/router";

export function NavUser() {
	const router = useRouter();

	const handleSignOut = async () => {
		await signOut();
		router.push("/");
	};
	return (
		<SidebarMenu>
			<Separator />
			<SidebarMenuItem>
				<div
					onClick={handleSignOut}
					className="text-md flex items-center gap-3 text-white p-2 rounded-sm hover:bg-blue-700 font-roboto cursor-pointer"
				>
					Cerrar Sesión
				</div>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
