-- AlterTable
ALTER TABLE `user` ADD COLUMN `publicKey` TEXT NULL,
    MODIFY `password` VARCHAR(255) NULL;
