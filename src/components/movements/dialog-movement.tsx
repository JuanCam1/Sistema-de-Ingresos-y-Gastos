import { DialogBase } from "@/components/shared/dialog-base";
import { columnsMovement } from "@/components/shared/table-movement/columns-movement";
import { DataTableMovement } from "@/components/shared/table-movement/data-table-movement";
import { UserModel } from "@/models/user-model";

interface Props {
	userSelected: UserModel;
	showModel: boolean;
	handleCloseModel: () => void;
}
export function DialogMovement({
	userSelected,
	showModel,
	handleCloseModel,
}: Props) {
	if (!userSelected) return null;

	return (
		<DialogBase
			title={`Movimientos de ${userSelected.name}`}
			description="Aquí visualizaras todos los movimientos del usuario"
			showModel={showModel}
			handleCloseModel={handleCloseModel}
		>
			<div className="flex flex-col justify-center items-center h-full">
				<DataTableMovement columns={columnsMovement} userId={userSelected.id} />
			</div>
		</DialogBase>
	);
}
