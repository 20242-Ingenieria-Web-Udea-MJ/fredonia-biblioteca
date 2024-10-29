import { PrismaClient } from "@prisma/client";
import localFont from "next/font/local";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();

  return {
    props: {
      user: JSON.parse(JSON.stringify(users)),
    },
  };
}

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <Head>
        <title>Biblioteca Fredonia</title>
      </Head>
      <h1 className="text-5xl text-primary">Biblioteca fredonia</h1>
      <div></div>
    </div>
  );
}
