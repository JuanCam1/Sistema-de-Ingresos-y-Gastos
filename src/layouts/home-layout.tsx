import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/sidebar/app-sidebar";
import { ToggleTheme } from "@/components/shared/toggle-theme";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="relative w-full bg-neutral-200 dark:bg-background">
				<div className="absolute top-0 right-0 p-2">
					<ToggleTheme />
				</div>
				{children}
			</main>
		</SidebarProvider>
	);
}
