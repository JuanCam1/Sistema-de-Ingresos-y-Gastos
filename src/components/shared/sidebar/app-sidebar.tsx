"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from "@/components/ui/sidebar";

import { AvatarSidebar } from "@/components/shared/sidebar/avatar-sidebar";
import { NavPaths } from "./nav-paths";
import { NavUser } from "./nav-user";
import { ComponentProps } from "react";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<AvatarSidebar />
			</SidebarHeader>
			<SidebarContent>
				<NavPaths />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
