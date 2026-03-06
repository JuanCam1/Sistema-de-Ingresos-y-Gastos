"use client";

import Link from "next/link";
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { pathsSidebar } from "@/consts/paths-sidebar";
import { useRouter } from "next/router";

export function NavPaths() {
	const router = useRouter();
	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden mt-6">
			<SidebarMenu>
				{pathsSidebar.map((item) => {
					const isActive = router.pathname === item.url;

					return (
						<SidebarMenuItem key={item.name} className="mx-3">
							<Link
								className={`text-sm flex items-center gap-3 text-white p-2 rounded-sm hover:bg-accent
									${isActive ? "bg-accent" : null}`}
								href={item.url}
							>
								<item.icon className="size-5" />
								<span>{item.name}</span>
							</Link>
						</SidebarMenuItem>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}
