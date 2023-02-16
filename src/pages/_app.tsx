import "@/styles/globals.css";
import { SWRConfig } from "swr";
import { Inter } from "@next/font/google";
import type { AppProps } from "next/app";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnMount: true,
        revalidateOnReconnect: false,
        refreshWhenOffline: false,
        refreshWhenHidden: false,
        refreshInterval: 0,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </SWRConfig>
  );
}
