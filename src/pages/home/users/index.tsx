import { columnsUser } from "@/components/shared/table-users/columns-user";
import { DataTableUser } from "@/components/shared/table-users/data-table-user";
import HomeLayout from "@/layouts/home-layout";
import { ReactElement } from "react";

export default function UserPage() {
	return (
		<div className="flex flex-col justify-center items-center h-full">
			<h2 className="text-accent text-5xl font-bold text-center text-blue-800 dark:text-white">
				Usuarios
			</h2>
			<DataTableUser columns={columnsUser} />
		</div>
	);
}

UserPage.getLayout = function getLayout(page: ReactElement) {
	return <HomeLayout>{page}</HomeLayout>;
};
