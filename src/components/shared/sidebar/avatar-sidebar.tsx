"use client";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export function AvatarSidebar() {
	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex justify-center items-center flex-col h-full pt-12 gap-4">
				<Avatar className="h-32 w-32">
					<AvatarImage
						src="https://github.com/shadcn.png"
						alt="@shadcn"
						className="grayscale object-cover"
					/>
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<span className="text-md text-white dark:text-gray-300">
					Juan Camilo Rojas
				</span>
				<Separator />
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
