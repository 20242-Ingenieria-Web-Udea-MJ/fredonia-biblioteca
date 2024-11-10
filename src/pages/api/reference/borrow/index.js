// pages/api/references/borrow/index.js

import { PrismaClient } from '@prisma/client';
import { log } from 'console';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { referenceId, userId } = req.body;

      // Check if the required data is provided
      if (!referenceId || !userId) {
        return res.status(400).json({ error: 'Missing referenceId or userId' });
      }

      // Get all books per reference
      const borrows = await prisma.borrow.findMany({
        where: { referenceId: referenceId, userId: userId},
      });

      if (borrows.length != 0) {
        if (!allBooksAvailable) {
          return res.status(400).json({ error: 'User already has this book' });
        }
      }

      const books = await prisma.book.findUnique({
        where: { referenceId: referenceId, isBorrowed: false },
      });
      
      if (books.length == 0) {
        return res.status(400).json({ error: 'No books available' });
      }
      const toBorrow = books[0];
      
      // Create the borrow in db
      const borrow = await prisma.borrow.create({
        data: {
          referenceId: referenceId,
          userId: userId,
          bookId: toBorrow.id,
          isActive: true,
          returned: false,
          startDate: new Date(),
          // end date is current date + 1 day
          endDate: new Date(new Date().setMinutes(new Date().getMinutes() + 1)),
        },
      });

      log(borrow);

      //Update book 
      const updatedBook = await prisma.book.update({
        where: { id: toBorrow.id },
        data: { isBorrowed: true },
      });

      //log the updated book
      log(updatedBook);

      // decrease reference availableUnits by one
      const reference = await prisma.reference.update({
        where: { id: referenceId },
        data: { availableUnits: { decrement: 1 } },
      });


      res.status(200).json(updatedReference);
    } catch (error) {
      console.error("Error borrowing reference:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
