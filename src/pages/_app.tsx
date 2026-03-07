import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode, useState } from "react";

import "@/styles/globals.css";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/context/theme-provider";
import {
	HydrationBoundary,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const [queryClient] = useState(() => new QueryClient());
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<QueryClientProvider client={queryClient}>
			<HydrationBoundary state={pageProps.dehydratedState}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<TooltipProvider>
						{getLayout(<Component {...pageProps} />)}
					</TooltipProvider>
				</ThemeProvider>
			</HydrationBoundary>
		</QueryClientProvider>
	);
}
