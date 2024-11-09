import {
  createAuth0User,
  deleteAuth0User,
  getAuth0Token,
  updateAuth0User,
} from "@/utils/api";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // READ ALL DATA
  if (req.method === "GET") {
    const users = await prisma.user.findMany();
    res.json(users);
  } else if (req.method === "POST") {
    // CREATE USER
    const { name, email, role, password } = req.body;

    try {
      // Obtener el token de Auth0 para autenticación
      const { access_token: accessToken, token_type: tokenType } =
        await getAuth0Token();

      // Crear el usuario en Auth0
      const auth0User = await createAuth0User(
        { email, password, connection: "Username-Password-Authentication" },
        accessToken,
        tokenType
      );

      if (!auth0User) {
        return res
          .status(500)
          .json({ error: "Error al crear usuario en Auth0" });
      }

      // Crear el usuario en la base de datos
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          role,
          password,
          accounts: {
            create: {
              provider: "auth0",
              providerAccountId: auth0User.user_id, // ID de Auth0
              access_token: accessToken as string,
              type: "oauth",
            },
          },
        },
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creando el usuario:", error);
      res.status(500).json({ error: "Error en la creación del usuario" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    try {
      const { access_token: accessToken, token_type: tokenType } =
        await getAuth0Token();

      // Obtener el auth0UserId desde la relación con Account en Prisma
      const userWithAuth0 = await prisma.user.findUnique({
        where: { id },
        include: {
          accounts: {
            where: { provider: "auth0" },
            select: { providerAccountId: true },
          },
        },
      });

      if (!userWithAuth0 || !userWithAuth0.accounts.length) {
        return res
          .status(404)
          .json({ error: "User or Auth0 account not found" });
      }

      const auth0UserId = userWithAuth0.accounts[0].providerAccountId;

      // Eliminar el usuario en Auth0
      await deleteAuth0User(auth0UserId, accessToken, tokenType);

      // Eliminar el usuario en Supabase
      await prisma.user.delete({ where: { id } });

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Error deleting user" });
    }
  } else if (req.method === "PUT") {
    const { id, name, email, role } = req.body;

    if (!id || !name || !email || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const { access_token: accessToken, token_type: tokenType } =
        await getAuth0Token();

      // Obtener el auth0UserId desde la relación con Account en Prisma
      const userWithAuth0 = await prisma.user.findUnique({
        where: { id },
        include: {
          accounts: {
            where: { provider: "auth0" },
            select: { providerAccountId: true },
          },
        },
      });

      if (!userWithAuth0 || !userWithAuth0.accounts.length) {
        return res
          .status(404)
          .json({ error: "User or Auth0 account not found" });
      }

      const auth0UserId = userWithAuth0.accounts[0].providerAccountId;

      // Editar el usuario en Auth0
      await updateAuth0User(
        auth0UserId,
        { name, email },
        accessToken,
        tokenType
      );

      // Editar el usuario en Supabase (o en tu base de datos principal)
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { name, email, role },
      });

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Error updating user" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
