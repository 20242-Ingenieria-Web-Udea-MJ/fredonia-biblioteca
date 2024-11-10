import { ReactNode } from "react";
import { SidebarProvider } from "../ui/sidebar";
import Sidebar from "../molecules/Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider className="flex min-h-screen w-full overflow-hidden">
      {/* Sidebar with fixed positioning */}
      <div className="fixed top-0 left-0 h-full w-[320px]">
        <Sidebar />
      </div>
      
      {/* Main content with left margin to account for the fixed sidebar */}
      <main className="ml-[320px] flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        {children}
      </main>
    </SidebarProvider>
  );
}

// export default function Layout({ children }: LayoutProps) {
//   return (
//     <SidebarProvider className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] overflow-hidden">
//       <Sidebar />
//       <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
//         {children}
//       </main>
//     </SidebarProvider>
//   );
// }
