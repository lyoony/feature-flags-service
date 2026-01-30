/*
  Warnings:

  - You are about to drop the `Feature_rule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Feature_rule" DROP CONSTRAINT "Feature_rule_feature_id_fkey";

-- DropTable
DROP TABLE "Feature_rule";

-- CreateTable
CREATE TABLE "FeatureRule" (
    "id" SERIAL NOT NULL,
    "feature_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FeatureRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experiment" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "feature_id" INTEGER NOT NULL,

    CONSTRAINT "Experiment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperimentVariant" (
    "id" SERIAL NOT NULL,
    "experiment_id" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "percentage" SMALLINT NOT NULL,

    CONSTRAINT "ExperimentVariant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Experiment_key_key" ON "Experiment"("key");

-- AddForeignKey
ALTER TABLE "FeatureRule" ADD CONSTRAINT "FeatureRule_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experiment" ADD CONSTRAINT "Experiment_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperimentVariant" ADD CONSTRAINT "ExperimentVariant_experiment_id_fkey" FOREIGN KEY ("experiment_id") REFERENCES "Experiment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
