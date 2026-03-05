"use client";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarSidebar() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<Avatar>
					<AvatarImage
						src="https://github.com/shadcn.png"
						alt="@shadcn"
						className="grayscale"
					/>
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
