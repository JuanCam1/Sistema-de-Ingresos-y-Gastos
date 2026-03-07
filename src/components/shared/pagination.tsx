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
		<div className="flex items-center justify-between border-t pt-2">
			<div className="text-sm text-muted-foreground">
				Página {page} de {totalPages}
			</div>

			<div className="flex items-center gap-2">
				<Button
					variant="outline"
					size="sm"
					onClick={() => previousPage()}
					disabled={!getCanPreviousPage()}
					className="group size-10 flex items-center justify-center bg-blue-600 rounded-sm cursor-pointer transition-colors duration-200 hover:bg-blue-700 hover:shadow-md"
				>
					<ArrowBigLeftDash className="text-white size-6 transition-transform duration-200	group-hover:-translate-x-1" />
				</Button>

				<Button
					variant="outline"
					size="sm"
					onClick={() => nextPage()}
					disabled={!getCanNextPage()}
					className="group size-10 flex items-center justify-center bg-blue-600 rounded-sm cursor-pointer transition-colors duration-200 hover:bg-blue-700 hover:shadow-md"
				>
					<ArrowBigRightDash className="text-white size-6 transition-transform duration-200	group-hover:translate-x-1" />
				</Button>
			</div>
		</div>
	);
}
