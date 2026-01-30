/*
  Warnings:

  - Added the required column `payload` to the `ExperimentVariant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExperimentVariant" ADD COLUMN     "payload" JSONB NOT NULL;

-- CreateTable
CREATE TABLE "ExperimentAssignment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "experimentId" INTEGER NOT NULL,
    "variantId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExperimentAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExperimentAssignment_userId_experimentId_key" ON "ExperimentAssignment"("userId", "experimentId");

-- AddForeignKey
ALTER TABLE "ExperimentAssignment" ADD CONSTRAINT "ExperimentAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperimentAssignment" ADD CONSTRAINT "ExperimentAssignment_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES "Experiment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperimentAssignment" ADD CONSTRAINT "ExperimentAssignment_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ExperimentVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
