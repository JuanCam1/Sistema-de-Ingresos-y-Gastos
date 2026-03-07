import { columnsUser } from "@/components/shared/table-users/columns-user";
import { DataTableUser } from "@/components/shared/table-users/data-table-user";

export default function UserPage() {
	return (
		<div className="flex flex-col justify-center items-center  h-full">
			<h2 className="text-accent text-5xl font-semibold text-center dark:text-white">
				Usuarios
			</h2>
			<DataTableUser columns={columnsUser} />
		</div>
	);
}
