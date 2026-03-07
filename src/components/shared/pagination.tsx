import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
	page: number;
	totalPages: number;
	previousPage: () => void;
	nextPage: () => void;
	getCanPreviousPage: () => boolean;
	getCanNextPage: () => boolean;
}
export function Pagination({
	page,
	totalPages,
	previousPage,
	nextPage,
	getCanPreviousPage,
	getCanNextPage,
}: Props) {
	return (
		<div className="flex items-center justify-between border-t pt-4">
			<div className="text-md text-muted-foreground">
				Página {page} de {totalPages}
			</div>

			<div className="flex items-center gap-2">
				<Button
					variant="outline"
					size="sm"
					onClick={() => previousPage()}
					disabled={!getCanPreviousPage()}
					className="px-6 py-6 cursor-pointer"
				>
					<ArrowBigLeftDash className="size-6" />
				</Button>

				<Button
					variant="outline"
					size="sm"
					onClick={() => nextPage()}
					disabled={!getCanNextPage()}
					className="px-6 py-6 cursor-pointer"
				>
					<ArrowBigRightDash className="size-6" />
				</Button>
			</div>
		</div>
	);
}
