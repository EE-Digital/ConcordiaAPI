/*
  Warnings:

  - Added the required column `text` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `messages` ADD COLUMN `text` VARCHAR(255) NOT NULL;
