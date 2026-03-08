import { ReactNode } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { cn } from "@/lib/utils";

interface Props {
	title: string;
	description: string;
	showModel: boolean;
	handleCloseModel: () => void;
	children: ReactNode;
	width?: string;
	height?: string;
}
export function DialogBase({
	title,
	description,
	children,
	showModel,
	handleCloseModel,
	width = "w-[1000px]",
	height,
}: Props) {
	return (
		<Dialog open={showModel} onOpenChange={handleCloseModel}>
			<DialogContent className={cn(width, height)}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>

				{children}
			</DialogContent>
		</Dialog>
	);
}
