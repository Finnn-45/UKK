/*
  Warnings:

  - Added the required column `category` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL;
