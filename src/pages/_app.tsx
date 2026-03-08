import { ReactElement, ReactNode, useState } from "react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { Roboto, Encode_Sans } from "next/font/google";
import {
	HydrationBoundary,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { ThemeProvider } from "@/context/theme-provider";
import "@/styles/globals.css";

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const roboto = Roboto({
	subsets: ["latin"],
	variable: "--font-roboto",
});

const encodeSans = Encode_Sans({
	subsets: ["latin"],
	variable: "--font-encode-sans",
});

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
					<div
						className={`${roboto.variable} ${encodeSans.variable} antialiased`}
					>
						{getLayout(<Component {...pageProps} />)}
					</div>
				</ThemeProvider>
			</HydrationBoundary>
		</QueryClientProvider>
	);
}
