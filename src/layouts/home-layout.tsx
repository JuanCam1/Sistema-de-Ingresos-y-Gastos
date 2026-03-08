import { ReactNode } from "react";
import { ArrowBigLeftDash } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/sidebar/app-sidebar";
import { ModeToggle } from "@/components/shared/toggle-theme";

interface Props {
	children: ReactNode;
}
export function HomeLayout({ children }: Props) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="relative w-full bg-neutral-200 dark:bg-zinc-800">
				<div className="absolute top-0 left-0 p-2">
					<button
						type="button"
						className="group dark:bg-slate-900 w-9 h-9 flex items-center justify-center rounded-sm cursor-pointer transition-colors duration-200 bg-white  hover:bg-neutral-200 shadow-md"
					>
						<ArrowBigLeftDash className="dark:text-white w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
					</button>
				</div>
				<div className="absolute top-0 right-0 p-2">
					<ModeToggle />
				</div>
				{children}
			</main>
		</SidebarProvider>
	);
}
