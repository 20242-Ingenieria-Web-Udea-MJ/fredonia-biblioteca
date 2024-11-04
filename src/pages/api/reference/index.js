// pages/api/references/index.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // READ ALL DATA
  if (req.method === 'GET') {
    const references = await prisma.reference.findMany();
    res.json(references);
  } 
 else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}