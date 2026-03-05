"use client";

import { Frame, Map, PieChart } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";

import { AvatarSidebar } from "@/components/shared/sidebar/avatar-sidebar";
import { NavPaths } from "./nav-paths";

const paths = [
	{
		name: "Movimientos",
		url: "/home/movements",
		icon: Frame,
	},
	{
		name: "Usuarios",
		url: "/home/users",
		icon: PieChart,
	},
	{
		name: "Reportes",
		url: "/home/reports",
		icon: Map,
	},
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<AvatarSidebar />
			</SidebarHeader>
			<SidebarContent>
				<NavPaths paths={paths} />
			</SidebarContent>
			<SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
