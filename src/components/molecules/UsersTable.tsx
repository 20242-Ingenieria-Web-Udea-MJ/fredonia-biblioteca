import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { ActionsMenu } from "./UsersActionMenu";
import { EditUserModal } from "./EditUserModal";
import { UserFormValues } from "@/schemas/UserSchema";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

type User = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  emailVerified?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  image?: string;
};

export const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/user");
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    const response = await fetch("/api/user", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId }),
    });
    if (response.ok) {
      setUsers(users.filter((user) => user.id !== userId));
      toast({
        title: "Ha ocurrido un error ❌",
        description: `${
          users.find((user) => user.id === userId)?.name
        } ha sido eliminado correctamente`,
      });
    } else {
      toast({
        title: "Ha ocurrido un error ❌",
        description: "Ha ocurrido un error al eliminar el usuario",
      });
    }
  };

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEditUser = async (data: UserFormValues) => {
    const response = await fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, id: selectedUser?.id }),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      setUsers(
        users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      toast({
        title: "Usuario actualizado ✅",
        description: `${updatedUser.name} ha sido actualizado correctamente`,
      });
      setSelectedUser(null); //cerrar modal
    } else {
      toast({
        title: "Ha ocurrido un error ❌",
        description: "Ha ocurrido un error al actualizar el usuario",
      });
    }
  };

  const columns = [
    { key: "id", label: "Identificador único" },
    { key: "createdAt", label: "Fecha de creación" },
    { key: "email", label: "Correo" },
    { key: "role", label: "Rol" },
  ];

  return (
    <>
      <Table>
        <TableCaption>Lista de usuarios registrados</TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
            <TableHead>
              <span className="sr-only">Acciones</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>
                {format(new Date(user.createdAt), "dd/MM/yyyy HH:mm")}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge>{user.role}</Badge>
              </TableCell>
              <TableCell>
                <ActionsMenu
                  userId={user.id}
                  onEdit={() => setSelectedUser(user)}
                  onDelete={() => handleDeleteUser(user.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          onSave={handleEditUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </>
  );
};
