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
    // CREATE NEW USER
    const { name, email, role, password } = req.body;

    try {
      const newUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
          role: role,
          password: password,
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Error creating user" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }
    try {
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
