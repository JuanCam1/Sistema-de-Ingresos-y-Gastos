import { UserModel } from "@/models/user-model";
import { DialogBase } from "@/components/shared/dialog-base";

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
			showModel={showModel}
			handleCloseModel={handleCloseModel}
		>
			<div className="flex flex-col justify-center items-center h-full">
				update user
			</div>
		</DialogBase>
	);
}
