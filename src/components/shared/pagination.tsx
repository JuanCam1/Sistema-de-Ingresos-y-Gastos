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
					size="lg"
					onClick={() => previousPage()}
					disabled={!getCanPreviousPage()}
					className="group bg-accent size-10 flex items-center justify-center	rounded-sm cursor-pointer							transition-colors duration-200hover:bg-[#4232f1]	hover:shadow-md"
				>
					<ArrowBigLeftDash className="text-white size-6 transition-transform duration-200	group-hover:-translate-x-1" />
				</Button>

				<Button
					variant="outline"
					size="sm"
					onClick={() => nextPage()}
					disabled={!getCanNextPage()}
					className="group bg-accent size-10 flex items-center justify-center	rounded-sm cursor-pointer							transition-colors duration-200hover:bg-[#4232f1]	hover:shadow-md"
				>
					<ArrowBigRightDash className="text-white size-6 transition-transform duration-200	group-hover:translate-x-1" />
				</Button>
			</div>
		</div>
	);
}
