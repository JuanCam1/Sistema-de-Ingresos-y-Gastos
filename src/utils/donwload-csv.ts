import { MovementModel } from "@/models/movement-model";

export const downloadMovementsCSV = (movements: MovementModel[]) => {
	const headers = ["fecha", "monto", "tipo", "usuario"];

	const rows = movements.map((m) => [
		new Date(m.fecha).toLocaleDateString("es-CO"),
		m.monto,
		m.type.name,
		m.user.name,
	]);

	const csvContent = [
		headers.join(","),
		...rows.map((row) => row.join(",")),
	].join("\n");

	const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

	const url = URL.createObjectURL(blob);

	const link = document.createElement("a");
	link.href = url;
	link.download = "movimientos.csv";
	link.click();

	URL.revokeObjectURL(url);
};
