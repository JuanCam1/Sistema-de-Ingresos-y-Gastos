import useMovementList from "@/hooks/use-movement-list";
import { UserModel } from "@/models/user-model";

interface Props {
	userSelected: UserModel;
}
export default function ReportChart({ userSelected }: Props) {
	const query = useMovementList({ userId: userSelected.id });
	const movements = query.data?.data ?? [];
	const isLoading = query.isLoading;
	const error = query.error;

	console.log(movements);

	return <div>ReportChart</div>;
}
