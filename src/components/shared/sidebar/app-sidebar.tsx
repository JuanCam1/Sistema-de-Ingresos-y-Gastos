"use client";

import { ComponentProps } from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from "@/components/ui/sidebar";

import { AvatarSidebar } from "@/components/shared/sidebar/avatar-sidebar";
import { NavPaths } from "./nav-paths";
import { NavUser } from "./nav-user";

interface Props extends ComponentProps<typeof Sidebar> {
	name: string;
	image: string;
	role?: string;
	roleId?: string;
}
export function AppSidebar({ name, image, role, roleId, ...props }: Props) {
	const finalRole = role || "Usuario";
	const finalRoleId = roleId || "1";
	
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<AvatarSidebar name={name} image={image} role={finalRole} roleId={finalRoleId} />
			</SidebarHeader>
			<SidebarContent>
				<NavPaths role={finalRole} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
