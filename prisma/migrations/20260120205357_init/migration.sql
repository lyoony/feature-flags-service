-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feature_rule" (
    "id" SERIAL NOT NULL,
    "feature_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Feature_rule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_key_key" ON "Feature"("key");

-- AddForeignKey
ALTER TABLE "Feature_rule" ADD CONSTRAINT "Feature_rule_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
