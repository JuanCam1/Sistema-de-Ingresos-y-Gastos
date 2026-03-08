import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { ReactNode } from "react";

interface Props {
	title: string;
	showModel: boolean;
	handleCloseModel: () => void;
	children: ReactNode;
}
export default function DialogBase({
	title,
	children,
	showModel,
	handleCloseModel,
}: Props) {
	return (
		<Dialog open={showModel} onOpenChange={handleCloseModel}>
			<DialogContent className="w-[1000px]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<DialogDescription>{children}</DialogDescription>
			</DialogContent>
		</Dialog>
	);
}
