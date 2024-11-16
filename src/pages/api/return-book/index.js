// pages/api/references/borrow/index.js

import { PrismaClient } from '@prisma/client';
import { log } from 'console';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { referenceId, borrowId, bookId} = req.body;

      console.log("referenceId", referenceId);
        console.log("borrowId", borrowId);
        console.log("bookId", bookId);

      // Check if the required data is provided
      if (!referenceId || !bookId || !borrowId) {
        return res.status(400).json({ error: 'Missing parameters' });
      }

      const borrow = await prisma.borrow.findUnique({
        where: { id: borrowId},
      });
      
      if (borrow.isActive == false  || borrow.returned == true) {
        return res.status(400).json({ error: 'Reference already returned' });
      }
      //Update book 
      await prisma.book.update({
        where: { id: bookId },
        data: { isBorrowed: false },
      });

      // increase reference availableUnits by one
      await prisma.reference.update({
        where: { id: referenceId },
        data: { availableUnits: { increment: 1 } },
      });

      // Get all books per reference
      await prisma.borrow.update({
        where: { id: borrowId },
        data: { isActive: false, returned: true },
      });

      res.status(200).json({ message: 'Reference returned successfully' });
    } catch (error) {
      console.error("Error borrowing reference:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
