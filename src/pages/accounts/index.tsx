import { UsersTable } from "@/components/molecules/users/UsersTable";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Session } from "next-auth";

interface ExtendedSession extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: "ADMIN" | "USER";
  };
}

export default function UsersPage() {
  const { data: session, status } = useSession() as {
    data: ExtendedSession | null;
    status: "loading" | "authenticated" | "unauthenticated";
  };
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    } else if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      setShowMessage(true);
      const timer = setTimeout(() => {
        router.replace("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (showMessage) {
    return (
      <div className="flex justify-center items-center w-full h-full p-12">
        <p className="text-6xl font-bold text-destructive">
          ❌ No tienes permiso para acceder a esta página. ❌
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Link href="/accounts/register" className="flex justify-end">
        <Button>Registrar Usuario</Button>
      </Link>
      <UsersTable />
    </div>
  );
}
