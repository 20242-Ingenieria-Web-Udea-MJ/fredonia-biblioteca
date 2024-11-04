import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { UserFormValues, userSchema } from "@/schemas/UserSchema";
import { zodResolver } from "@hookform/resolvers/zod";

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
          <Input
            {...form.register("role")}
            placeholder="Rol"
            defaultValue={user?.role}
          />
          <Button type="submit">Guardar cambios</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
