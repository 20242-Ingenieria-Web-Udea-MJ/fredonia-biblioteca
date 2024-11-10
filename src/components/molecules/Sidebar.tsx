import React from "react";
import Link from "next/link";
import {
  Bell,
  Book,
  Home,
  LogOut,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarImage } from "../ui/avatar";

interface ExtendedSession extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: "ADMIN" | "USER";
  };
}

const Sidebar = () => {
  const { data: session } = useSession() as { data: ExtendedSession | null };

  function endSession() {
    signOut();
  }

  return (
    <div className="hidden border-r bg-muted/40 md:block h-full">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Book className="h-6 w-6 text-primary" />
            <span className="">Biblioteca Fredonia</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-6 w-6" />
            <span className="sr-only">Notificaciones</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-base font-medium lg:px-4 ">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Home className="h-6 w-6" />
              Inicio
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <ShoppingCart className="h-6 w-6" />
              Prestamos
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                2
              </Badge>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-muted-foreground hover:text-primary"
            >
              <Package className="h-6 w-6" />
              Libros
            </Link>
            <Link
              href="/accounts"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-6 w-6" />
              Usuarios
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
          {session ? (
            <Card>
              <CardHeader className="p-2 pt-0 md:p-4 flex gap-2 justify-center items-center">
                <Avatar>
                  <AvatarImage
                    src={
                      session.user?.image ??
                      "https://cdn-icons-png.flaticon.com/512/2997/2997608.png"
                    }
                    alt="Imágen de perfil"
                  />
                </Avatar>
                <div className="flex flex-col items-center justify-center">
                  <CardTitle>{session.user?.name}</CardTitle>
                  <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                    {session.user?.role}
                  </CardContent>
                </div>
                <Button onClick={endSession} className="rounded-full p-2">
                  Cerrar Sesión
                  <LogOut />
                </Button>
              </CardHeader>
            </Card>
          ) : (
            <Button onClick={() => signIn("auth0")} className="w-full">
              Iniciar Sesión
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
