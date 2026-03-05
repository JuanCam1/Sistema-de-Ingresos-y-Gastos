import { TooltipProvider } from "@/components/ui/tooltip";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="es">
			<Head />
			<body className="antialiased">
				<TooltipProvider>
					<Main />
					<NextScript />
				</TooltipProvider>
			</body>
		</Html>
	);
}
