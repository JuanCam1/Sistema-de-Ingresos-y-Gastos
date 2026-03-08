"use client";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export function NavUser() {
	return (
		<SidebarMenu>
			<Separator />
			<SidebarMenuItem>
				<Link
					href="/"
					className="text-md flex items-center gap-3 text-white p-2 rounded-sm hover:bg-blue-700 font-roboto"
				>
					Cerrar Sesión
				</Link>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
