import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Layout from "@/components/organisms/Layout";
import { Toaster } from "@/components/ui/toaster";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Biblioteca Fredonia</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </SessionProvider>
  );
}
