import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { ReactNode } from "react";

interface Props {
	name: string;
	showModel: boolean;
	handleCloseModel: () => void;
	children: ReactNode;
}
export default function DialogBase({
	name,
	children,
	showModel,
	handleCloseModel,
}: Props) {
	return (
		<Dialog open={showModel} onOpenChange={handleCloseModel}>
			<DialogContent className="w-[1000px]">
				<DialogHeader>
					<DialogTitle>Movimientos de {name}</DialogTitle>
					<DialogDescription>{children}</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
