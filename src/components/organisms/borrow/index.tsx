import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Session } from "next-auth";
import { useSession } from "next-auth/react";


import React from 'react';

import { useState, useEffect } from "react";


type Reference = {
  id: string;
  title: string;
  publisher: string;
  publicationYear: string;
  ISBN: string;
  genre: string;
  availableUnits: string;
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

  async function borrowBook(referenceId: string, userId: string) {
    console.log("Borrowing book");
    console.log(referenceId);
    console.log(userId);
  
    const endpoint = "/api/reference/borrow";
    const body = { referenceId, userId };
  
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
      }
      else {
        const data = await response.json();
        console.log("Book borrowed successfully:", data);
      }
  
      
    } catch (error) {
      console.error("Failed to borrow book:", error);
    }
  }
  const [references, setReferences] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/reference");
      const data = await response.json();
      setReferences(data);
    };

    fetchTasks();
  }, []);

  return (
      <Card className="w-full h-full overflow-scroll">
        <CardHeader className='px-7'>
          <CardTitle>Libros</CardTitle>
          <CardDescription>Libros disponibles en la biblioteca</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader >
              <TableRow >
                <TableHead className='text-center'>Título</TableHead>
                <TableHead className='hidden sm:table-cell text-center'>Editorial</TableHead>
                <TableHead className='hidden sm:table-cell text-center'>Año de publicación</TableHead>
                <TableHead className='hidden md:table-cell text-center'>ISBN</TableHead>
                <TableHead className='text-center'>Unidades disponibles</TableHead>
                <TableHead className='text-center'>Prestar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='text-center'>
              {references.map((reference: Reference) => (
                <TableRow key={reference.id} className='bg-accent'>
                  <TableCell className='hidden sm:table-cell'>
                    <div className='font-medium'>{reference.title}</div>
                  </TableCell>
                  <TableCell className='hidden md:table-cell text-center'>{reference.publisher}</TableCell>
                  <TableCell className='hidden md:table-cell text-center'>{reference.publicationYear}</TableCell>
                  <TableCell className='hidden md:table-cell text-center'>{reference.ISBN}</TableCell>
                  <TableCell className='hidden md:table-cell text-center'>{reference.availableUnits}</TableCell>
                  <TableCell className='hidden md:table-cell text-center'>{
                    reference.availableUnits == '0' ? (
                      <Button className='bg-red-400'>
                        No disponible
                      </Button>
                    ) : (
                      session ? (
                        <Button onClick={() => session?.user?.id && borrowBook(reference.id, session.user.id)}>
                          Prestar
                        </Button>
                      ) : (
                        <Button>
                          Prestar
                        </Button>
                      )
                    )
                    }</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }