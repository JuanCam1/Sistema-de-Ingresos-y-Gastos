import { ReactNode } from "react";
import { ArrowBigLeftDash } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/sidebar/app-sidebar";
import { ToggleTheme } from "@/components/shared/toggle-theme";

export default function HomeLayout({ children }: { children: ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="relative w-full bg-neutral-200 dark:bg-zinc-800">
				<div className="absolute top-0 left-0 p-2">
					<button
						type="button"
						className="bg-accent p-2 rounded-sm cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#4232f1] hover:scale-105 hover:shadow-md"
					>
						<ArrowBigLeftDash className="text-white size-5" />
					</button>
				</div>
				<div className="absolute top-0 right-0 p-2">
					<ToggleTheme />
				</div>
				{children}
			</main>
		</SidebarProvider>
	);
}
