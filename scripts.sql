INSERT INTO public."Reference" (
  id, "createdBy", title, publisher, "publicationYear", "ISBN", genre, "availableUnits", "createdAt", "lastModified"
) VALUES 
  (1, 'cm38zb2ee0000x23b8unt3ec4', 'Introduction to Algorithms', 'MIT Press', 2009, '9780262033848', 'Computer Science', 5, '2024-10-01 10:00:00', '2024-10-01 10:00:00'),
  (2, 'cm38zb2ee0000x23b8unt3ec4', 'Clean Code', 'Prentice Hall', 2008, '9780132350884', 'Software Engineering', 3, '2024-10-02 12:30:00', '2024-10-02 12:30:00'),
  (3, 'cm38zb2ee0000x23b8unt3ec4', 'The Pragmatic Programmer', 'Addison-Wesley', 1999, '9780201616224', 'Software Engineering', 2, '2024-10-03 14:15:00', '2024-10-03 14:15:00')


-- Books for Reference 1: "Introduction to Algorithms" (5 units)
INSERT INTO public."Book" (id, "referenceId", "createdBy", "isBorrowed", "createdAt", "lastModified") VALUES
  (1, 1, 'cm38zb2ee0000x23b8unt3ec4', false, '2024-10-01 10:00:00', '2024-10-01 10:00:00'),
  (2, 1, 'cm38zb2ee0000x23b8unt3ec4', false, '2024-10-01 10:00:00', '2024-10-01 10:00:00'),
  (3, 1, 'cm38zb2ee0000x23b8unt3ec4', true,  '2024-10-01 10:00:00', '2024-10-02 09:30:00'),
  (4, 1, 'cm38zb2ee0000x23b8unt3ec4', true,  '2024-10-01 10:00:00', '2024-10-02 09:30:00'),
  (5, 1, 'cm38zb2ee0000x23b8unt3ec4', false, '2024-10-01 10:00:00', '2024-10-01 10:00:00');

-- Books for Reference 2: "Clean Code" (3 units)
INSERT INTO public."Book" (id, "referenceId", "createdBy", "isBorrowed", "createdAt", "lastModified") VALUES
  (6, 2, 'cm38zb2ee0000x23b8unt3ec4', true,  '2024-10-02 12:30:00', '2024-10-02 12:30:00'),
  (7, 2, 'cm38zb2ee0000x23b8unt3ec4', false, '2024-10-02 12:30:00', '2024-10-02 12:30:00'),
  (8, 2, 'cm38zb2ee0000x23b8unt3ec4', false, '2024-10-02 12:30:00', '2024-10-02 12:30:00');

-- Books for Reference 3: "The Pragmatic Programmer" (2 units)
INSERT INTO public."Book" (id, "referenceId", "createdBy", "isBorrowed", "createdAt", "lastModified") VALUES
  (9, 3, 'cm38zb2ee0000x23b8unt3ec4', true,  '2024-10-03 14:15:00', '2024-10-03 14:15:00'),
  (10, 3, 'cm38zb2ee0000x23b8unt3ec4', false, '2024-10-03 14:15:00', '2024-10-03 14:15:00');



 -- Borrow for Reference 1: "Introduction to Algorithms" (Book ID 1)
INSERT INTO public."Borrow" (
  id, "userId", "referenceId","bookId", "isActive", returned, "startDate", "endDate", "lastModified", "createdAt"
) VALUES (
  1,  'cm38zb2ee0000x23b8unt3ec4', 1,1, true, false, '2024-10-05 09:00:00', '2024-10-12 09:00:00', '2024-10-05 09:00:00', '2024-10-05 09:00:00'
);

-- Borrow for Reference 2: "Clean Code" (Book ID 6)
INSERT INTO public."Borrow" (
  id, "userId","referenceId", "bookId", "isActive", returned, "startDate", "endDate", "lastModified", "createdAt"
) VALUES (
  2, 'cm38zb2ee0000x23b8unt3ec4',2, 6, true, false, '2024-10-06 10:30:00', '2024-10-13 10:30:00', '2024-10-06 10:30:00', '2024-10-06 10:30:00'
);

-- Borrow for Reference 3: "The Pragmatic Programmer" (Book ID 9)
INSERT INTO public."Borrow" (
  id, "userId", "referenceId","bookId", "isActive", returned, "startDate", "endDate", "lastModified", "createdAt"
) VALUES (
  3, 'cm38zb2ee0000x23b8unt3ec4',3, 9, true, false, '2024-10-07 14:00:00', '2024-10-14 14:00:00', '2024-10-07 14:00:00', '2024-10-07 14:00:00'
);


select * from public."Book"

select * from public."Borrow"

select * from public."Session"

select * from public."User"
  