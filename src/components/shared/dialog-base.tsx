import { ReactNode } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";

interface Props {
	title: string;
	description: string;
	showModel: boolean;
	handleCloseModel: () => void;
	children: ReactNode;
}
export function DialogBase({
	title,
	description,
	children,
	showModel,
	handleCloseModel,
}: Props) {
	return (
		<Dialog open={showModel} onOpenChange={handleCloseModel}>
			<DialogContent className="w-[1000px]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>

				{children}
			</DialogContent>
		</Dialog>
	);
}
