/*
  Warnings:

  - The `genres` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "genres",
ADD COLUMN     "genres" TEXT[];

-- password password
INSERT INTO users (email, username, password, role) VALUES ('some@mail.ru', 'someName', '$2b$10$/zQ4d7TqRcVaIg81xnGL3uv8eA0ilA45v3bGuk2M8au4R6Rd5MwvS', 2);
