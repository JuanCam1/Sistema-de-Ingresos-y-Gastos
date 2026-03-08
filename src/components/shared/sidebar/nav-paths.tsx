"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { pathsSidebar } from "@/consts/paths-sidebar";

interface Props {
	role: string;
}
export function NavPaths({ role }: Props) {
	const router = useRouter();

	const filteredUser = pathsSidebar.filter((path) => {
		if (role === "Usuario") {
			return path.name === "Movimientos";
		}
		return true;
	});

	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden mt-6">
			<SidebarMenu>
				{filteredUser.map((item) => {
					const isActive = router.pathname === item.url;

					return (
						<SidebarMenuItem key={item.name} className="mx-3">
							<Link
								className={`font-roboto text-md flex items-center gap-3 text-white p-2 rounded-sm hover:bg-blue-700
									${isActive ? "bg-blue-700" : null}`}
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
