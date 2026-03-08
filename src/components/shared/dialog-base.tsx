import { ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface Props {
	title: string;
	showModel: boolean;
	handleCloseModel: () => void;
	children: ReactNode;
}
export function DialogBase({
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
				{children}
			</DialogContent>
		</Dialog>
	);
}
