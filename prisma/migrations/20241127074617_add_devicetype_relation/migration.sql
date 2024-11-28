/*
  Warnings:

  - Added the required column `deviceTypeId` to the `Operations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Operations" ADD COLUMN     "deviceTypeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Operations" ADD CONSTRAINT "Operations_deviceTypeId_fkey" FOREIGN KEY ("deviceTypeId") REFERENCES "DeviceTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
