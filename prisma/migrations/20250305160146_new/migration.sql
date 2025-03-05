/*
  Warnings:

  - Added the required column `mode` to the `ListaDePresenca` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ListaDePresenca" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cooperadoId" TEXT,
    "name" TEXT NOT NULL,
    "cpf_or_cnpj" TEXT NOT NULL,
    "mode" TEXT NOT NULL
);
INSERT INTO "new_ListaDePresenca" ("cooperadoId", "cpf_or_cnpj", "id", "name") SELECT "cooperadoId", "cpf_or_cnpj", "id", "name" FROM "ListaDePresenca";
DROP TABLE "ListaDePresenca";
ALTER TABLE "new_ListaDePresenca" RENAME TO "ListaDePresenca";
CREATE UNIQUE INDEX "ListaDePresenca_cpf_or_cnpj_key" ON "ListaDePresenca"("cpf_or_cnpj");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
