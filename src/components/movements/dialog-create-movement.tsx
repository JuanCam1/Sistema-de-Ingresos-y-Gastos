import { DialogBase } from "@/components/shared/dialog-base";

interface Props {
	showModel: boolean;
	handleCloseModel: () => void;
}
export function DialogCreateMovement({ showModel, handleCloseModel }: Props) {
	return (
		<DialogBase
			title="Crear nuevo movimiento"
			description="Agrega los datos necesario y crea un nuevo movimiento"
			showModel={showModel}
			handleCloseModel={handleCloseModel}
		>
			<div className="flex flex-col justify-center items-center h-full">
				creando ...
			</div>
		</DialogBase>
	);
}
