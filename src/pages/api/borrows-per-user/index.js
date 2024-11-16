// pages/api/references/index.js

import { PrismaClient } from '@prisma/client';
import { log } from 'console';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Get all by userId
  if (req.method === 'GET') {
    const { userId } = req.query;
    const references = await prisma.borrow.findMany({
      where: {
        userId: userId,
      },
      include: {
        reference: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });
    log(references);
    res.json(references);
  } 
 else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}