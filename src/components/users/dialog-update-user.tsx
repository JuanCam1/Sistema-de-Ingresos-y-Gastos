import { UserModel } from "@/models/user-model";
import { DialogBase } from "@/components/shared/dialog-base";
import { FormUpdateUser } from "./form-update.user";

interface Props {
	userSelected: UserModel;
	showModel: boolean;
	handleCloseModel: () => void;
}
export function DialogUpdateUser({
	userSelected,
	showModel,
	handleCloseModel,
}: Props) {
	if (!userSelected) return null;

	return (
		<DialogBase
			title={`Actualizar ${userSelected.name}`}
			description="Cambia los datos del usuario que necesites actualizar."
			showModel={showModel}
			handleCloseModel={handleCloseModel}
			width="w-[500px]"
		>
			<FormUpdateUser userSelected={userSelected} />
		</DialogBase>
	);
}
