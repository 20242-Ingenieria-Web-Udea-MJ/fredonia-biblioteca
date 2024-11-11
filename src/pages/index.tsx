import Hero from "@/components/molecules/Hero";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "../lib/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../lib/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} relative min-h-screen flex flex-col items-center justify-center p-6 gap-8 sm:p-10`}
    >
      <Hero />
    </div>
  );
}
