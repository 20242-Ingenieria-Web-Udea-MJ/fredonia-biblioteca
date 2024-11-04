import * as z from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Correo electrónico inválido"),
  role: z.enum(["ADMIN", "USER"]),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type UserFormValues = z.infer<typeof userSchema>;
