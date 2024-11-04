import { useSession, signIn } from "next-auth/react";
import { ReactNode } from "react";
import { SidebarProvider } from "../ui/sidebar";
import Sidebar from "../molecules/Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { data: session, status } = useSession();
  if (status === "loading") return <div>Cargando...</div>;
  if (!session) {
    signIn("auth0");
  }
  return (
    <SidebarProvider className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        {children}
      </main>
    </SidebarProvider>
  );
}
