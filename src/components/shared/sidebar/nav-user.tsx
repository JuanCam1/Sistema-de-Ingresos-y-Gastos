"use client";
import { Separator } from "@/components/ui/separator";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavUser() {
	return (
		<SidebarMenu>
			<Separator />
			<SidebarMenuItem>
				<Link
					href="/"
					className="text-sm flex items-center gap-3 text-white p-2 rounded-sm hover:bg-accent"
				>
					Cerrar Sesión
				</Link>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
