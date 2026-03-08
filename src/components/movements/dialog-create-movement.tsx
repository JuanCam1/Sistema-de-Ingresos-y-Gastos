import { DialogBase } from "@/components/shared/dialog-base";
import { FormCreateMovement } from "./form-create-movement";

interface Props {
	userId: string;
	showModel: boolean;
	handleCloseModel: () => void;
}
export function DialogCreateMovement({
	userId,
	showModel,
	handleCloseModel,
}: Props) {
	console.log(userId);

	return (
		<DialogBase
			title="Crear nuevo movimiento"
			description="Agrega los datos necesario y crea un nuevo movimiento"
			showModel={showModel}
			handleCloseModel={handleCloseModel}
			width="w-[700px]"
		>
			<FormCreateMovement userId={userId} handleClose={handleCloseModel} />
		</DialogBase>
	);
}
