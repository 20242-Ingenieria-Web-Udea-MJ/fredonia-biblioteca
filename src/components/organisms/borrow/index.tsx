import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

import React from "react";

import { useState, useEffect } from "react";

type Borrow = {
  id: string;
  userId: string;
  bookId: string;
  isActive: boolean;
  returned: boolean;
  startDate: string;
  endDate: string;
  reference: { id: string; title: string };
};

interface ExtendedSession extends Session {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: "ADMIN" | "USER";
  };
}

export default function Component() {
  const { data: session } = useSession() as { data: ExtendedSession | null };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [borrows, setBorrows] = useState<any[]>([]);

  async function returnBook(
    referenceId: string,
    borrowId: string,
    bookId: string
  ) {
    console.log("Returning book");

    const endpoint = "/api/return-book";
    const body = { referenceId, borrowId, bookId };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.log(`Error: ${response.statusText}`);
      } else {
        const data = await response.json();
        console.log("Book returned successfully:", data);
      }
    } catch (error) {
      console.error("Failed to returned book:", error);
    }
  }

  useEffect(() => {
    const fetchBorrows = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(
            `/api/borrows-per-user?userId=${session.user.id}`
          );
          if (response.ok) {
            const data = await response.json();
            setBorrows(data);
          } else {
            console.error(`Error fetching borrows: ${response.statusText}`);
          }
        } catch (error) {
          console.error("Failed to fetch borrows:", error);
        }
      }
    };

    fetchBorrows();
  }, [session?.user?.id]);

  if (!session) {
    return <div>Para ingresar a esta vista debe iniciar sesión...</div>;
  }

  return (
    <Card className="w-full h-full overflow-scroll">
      <CardHeader className="px-7">
        <CardTitle>Préstamos</CardTitle>
        <CardDescription>Libros prestados por el usuario</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Título</TableHead>
              <TableHead className="hidden sm:table-cell text-center">
                Activo
              </TableHead>
              <TableHead className="hidden sm:table-cell text-center">
                Devuelto
              </TableHead>
              <TableHead className="hidden md:table-cell text-center">
                Fecha de inicio
              </TableHead>
              <TableHead className="text-center">Fecha de entrega</TableHead>
              <TableHead className="hidden md:table-cell text-center">
                Regresar
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-center">
            {borrows.map((borrow: Borrow) => (
              <TableRow key={borrow.id} className="bg-accent">
                <TableCell className="hidden sm:table-cell">
                  <div className="font-medium">{borrow.reference.title}</div>
                </TableCell>
                <TableCell
                  className={`hidden md:table-cell text-center ${
                    borrow.isActive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {borrow.isActive ? "Activo" : "Inactivo"}
                </TableCell>
                <TableCell
                  className={`hidden md:table-cell text-center ${
                    borrow.returned ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {borrow.returned ? "Si" : "No"}
                </TableCell>
                <TableCell className="hidden md:table-cell text-center">
                  {borrow.startDate}
                </TableCell>
                <TableCell className="hidden md:table-cell text-center">
                  {borrow.endDate}
                </TableCell>
                <TableCell className="hidden md:table-cell text-center">
                  {borrow.returned ? (
                    <Button className="bg-red-400">Devuelto</Button>
                  ) : (
                    <Button
                      onClick={() =>
                        returnBook(
                          borrow.reference.id,
                          borrow.id,
                          borrow.bookId
                        )
                      }
                    >
                      Regresar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
