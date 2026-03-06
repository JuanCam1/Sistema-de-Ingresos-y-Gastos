import { Frame, FileChartPie, Users, BanknoteArrowUp } from "lucide-react";
import { PathI } from "@/models/path-model";

export const pathsSidebar: PathI[] = [
	{
		name: "Panel",
		url: "/home",
		icon: Frame,
	},
	{
		name: "Movimientos",
		url: "/home/movements",
		icon: BanknoteArrowUp,
	},
	{
		name: "Usuarios",
		url: "/home/users",
		icon: Users,
	},
	{
		name: "Reportes",
		url: "/home/reports",
		icon: FileChartPie,
	},
];
