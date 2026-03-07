import { columnsMovement } from "@/components/shared/table-movement/columns-movement";
import { DataTableMovement } from "@/components/shared/table-movement/data-table-movement";
import HomeLayout from "@/layouts/home-layout";
import { ReactElement } from "react";

export default function MovementsPage() {
	return (
		<div className="flex flex-col justify-center items-center  h-full">
			<h2 className="text-accent text-5xl font-semibold text-center dark:text-white">
				Movimientos
			</h2>
			<DataTableMovement columns={columnsMovement} />
		</div>
	);
}

MovementsPage.getLayout = function getLayout(page: ReactElement) {
	return <HomeLayout>{page}</HomeLayout>;
};
