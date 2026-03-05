import type { AppProps } from "next/app";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/styles/globals.css";


// const montserrat = Montserrat({
//   subsets: ["latin"],
//   variable: "--font-montserrat"
// })

// const roboto = Roboto_Mono({
//   subsets:["latin"],
//   variable: "--font-roboto"
// })
export default function App({ Component, pageProps }: AppProps) {
  return (
    <TooltipProvider>
      <Component {...pageProps} />
    </TooltipProvider>
  )
}
