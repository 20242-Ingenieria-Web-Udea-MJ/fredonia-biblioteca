import createApolloClient from "@/apollo/Client";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={createApolloClient()}>
        <Head>
          <title>Biblioteca Fredonia</title>
          <Component {...pageProps} />
        </Head>
      </ApolloProvider>
    </SessionProvider>
  );
}
