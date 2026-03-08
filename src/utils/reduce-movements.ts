import { MovementModel } from "@/models/movement-model";
import { ValuesTypeMovement } from "@/models/type-movement-model";

export const groupMovementsByMonth = (movements: MovementModel[]) => {
	const labelsValues = movements.map((m) =>
		new Date(m.fecha).toLocaleDateString("es-ES"),
	);

	const income = movements
		.filter((m) => m.type.name === ValuesTypeMovement.INGRESO)
		.map((m) => Number(m.monto));

	const expenses = movements
		.filter((m) => m.type.name === ValuesTypeMovement.EGRESO)
		.map((m) => Number(-m.monto));

	const data = {
		labels: labelsValues,
		datasets: [
			{
				label: "Ingresos",
				data: income,
				backgroundColor: "#0d9488",
			},
			{
				label: "Gastos",
				data: expenses,
				backgroundColor: "#ef4444",
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: "Reporte de Ingresos y Gastos",
			},
		},
	};

	const totalIngresos = income.reduce((acc, val) => acc + val, 0);
	const totalEgresos = expenses.reduce((acc, val) => acc + val, 0);

	const balance = totalIngresos + totalEgresos;

	return {
		labelsValues,
		data,
		options,
		totals: {
			income: totalIngresos,
			expenses: totalEgresos,
			balance,
		},
	};
};
