"use client";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface Props {
	name: string;
	image: string;
	role: string;
	roleId: string;
}
export function AvatarSidebar({ image, name, role, roleId }: Props) {
	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex justify-center items-center flex-col h-full pt-12 gap-4">
				<Avatar className="h-32 w-32">
					<AvatarImage
						src={image || "/no-user.png"}
						alt={name}
						className="grayscale object-cover"
					/>
					<AvatarFallback>
						{name
							.split(" ")
							.map((n) => n[0])
							.join("")}
					</AvatarFallback>
				</Avatar>

				<span className="text-md text-white dark:text-gray-300 font-roboto">
					{name}
				</span>
				<span className="text-sm text-white dark:text-gray-300 font-roboto">
					{role}
				</span>
				<Separator />
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
