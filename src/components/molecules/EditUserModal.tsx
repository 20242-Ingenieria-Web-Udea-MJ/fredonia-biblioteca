import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { UserFormValues, userSchema } from "@/schemas/UserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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

type EditUserModalProps = {
  user: User | null;
  onSave: (data: UserFormValues) => void;
  onClose: () => void;
};

export const EditUserModal = ({
  user,
  onSave,
  onClose,
}: EditUserModalProps) => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: user || { name: "", email: "", role: "USER", password: "" },
  });

  const onSubmit = (data: UserFormValues) => {
    onSave(data);
    onClose();
  };

  return (
    <Dialog open={!!user} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Editar Usuario</DialogTitle>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...form.register("name")}
            placeholder="Nombre completo"
            defaultValue={user?.name}
          />
          <Input
            {...form.register("email")}
            placeholder="Correo"
            defaultValue={user?.email}
          />
          <Select
            defaultValue={user?.role}
            onValueChange={(value) =>
              form.setValue("role", value as "ADMIN" | "USER")
            }
            value={form.watch("role")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione el rol del usuario" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USER">Usuario</SelectItem>
              <SelectItem value="ADMIN">Administrador</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex flex-row justify-between">
            <Button type="submit">Guardar cambios</Button>
            <DialogClose asChild>
              <Button type="button" variant="destructive">
                Cerrar
              </Button>
            </DialogClose>
          </div>
        </form>
        <DialogDescription>
          Ventana emergente para editar un usuario
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
