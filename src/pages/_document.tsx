import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="es" suppressHydrationWarning>
			<Head />
			<body className="antialiased bg-neutral-200 dark:bg-background">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
