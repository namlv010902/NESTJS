/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `Post` table. All the data in the column will be lost.
  - Added the required column `image` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_ownerId_fkey`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `ownerId`,
    DROP COLUMN `summary`,
    ADD COLUMN `image` VARCHAR(191) NOT NULL;
