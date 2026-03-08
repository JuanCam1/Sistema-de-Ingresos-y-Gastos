import { UserModel } from "@/models/user-model";
import { DialogBase } from "@/components/shared/dialog-base";
import { ReportChart } from "./report-chart";

interface Props {
	userSelected: UserModel;
	showModel: boolean;
	handleCloseModel: () => void;
}
export function DialogReport({
	userSelected,
	showModel,
	handleCloseModel,
}: Props) {
	if (!userSelected) return null;

	return (
		<DialogBase
			title={`Reporte de ${userSelected.name}`}
			showModel={showModel}
			handleCloseModel={handleCloseModel}
		>
			<div className="flex flex-col justify-center items-center h-full">
				<ReportChart userSelected={userSelected} />
			</div>
		</DialogBase>
	);
}
