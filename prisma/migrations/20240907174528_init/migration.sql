/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Book_authorId_key" ON "Book"("authorId");
