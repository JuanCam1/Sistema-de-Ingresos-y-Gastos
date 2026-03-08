import { useMovementList } from "@/hooks/use-movement-list";
import { UserModel } from "@/models/user-model";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { Loading } from "../shared/loading";

import { groupMovementsByMonth } from "@/utils/reduce-movements";
import { formatCOP } from "@/utils/format-cop";
import { CloudDownload } from "lucide-react";
import { downloadMovementsCSV } from "@/utils/donwload-csv";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

interface Props {
	userSelected: UserModel;
}
export function ReportChart({ userSelected }: Props) {
	const query = useMovementList({ userId: userSelected.id });
	const movements = query.data?.data ?? [];
	const isLoading = query.isLoading;
	const error = query.error;

	const { data, options, totals } = groupMovementsByMonth(movements);

	return (
		<>
			{isLoading ? (
				<Loading />
			) : error ? (
				<p>Error al cargar los movimientos</p>
			) : (
				<>
					<Bar data={data} options={options} />
					<div className="mt-6 w-full flex justify-between">
						<div className="bg-green-100 p-4 rounded">
							<h3 className="text-green-700 text-lg font-bold mb-2">
								Ingresos: {formatCOP(totals.income)}
							</h3>
						</div>
						<div className="bg-red-100 p-4 rounded">
							<h3 className="text-red-700 text-lg font-bold mb-2">
								Gastos: {formatCOP(Math.abs(totals.expenses))}
							</h3>
						</div>
						<div className="bg-blue-100 p-4 rounded">
							<h3 className="text-blue-700 text-lg font-bold mb-2">
								Saldo: {formatCOP(totals.balance)}
							</h3>
						</div>
					</div>

					<div className="mt-6">
						<button
							onClick={() => downloadMovementsCSV(movements)}
							className="cursor-pointer flex justify-between bg-teal-800 px-3 py-3 rounded-md text-white tracking-wider shadow-xl hover:bg-teal-900 hover:scale-105 duration-500 hover:ring-1 w-[200px]"
						>
							Descargar CSV
							<CloudDownload className="w-5 h-5 animate-bounce" />
						</button>
					</div>
				</>
			)}
		</>
	);
}
