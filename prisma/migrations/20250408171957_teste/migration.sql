/*
  Warnings:

  - You are about to drop the column `cooperadoId` on the `ListaDePresenca` table. All the data in the column will be lost.
  - You are about to drop the column `cooperadoId` on the `SocioCooperado` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ListaDePresenca" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cpf_or_cnpj" TEXT NOT NULL,
    "mode" TEXT NOT NULL
);
INSERT INTO "new_ListaDePresenca" ("cpf_or_cnpj", "id", "mode", "name") SELECT "cpf_or_cnpj", "id", "mode", "name" FROM "ListaDePresenca";
DROP TABLE "ListaDePresenca";
ALTER TABLE "new_ListaDePresenca" RENAME TO "ListaDePresenca";
CREATE UNIQUE INDEX "ListaDePresenca_cpf_or_cnpj_key" ON "ListaDePresenca"("cpf_or_cnpj");
CREATE TABLE "new_SocioCooperado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cpf_or_cnpj" TEXT NOT NULL
);
INSERT INTO "new_SocioCooperado" ("cpf_or_cnpj", "id", "name") SELECT "cpf_or_cnpj", "id", "name" FROM "SocioCooperado";
DROP TABLE "SocioCooperado";
ALTER TABLE "new_SocioCooperado" RENAME TO "SocioCooperado";
CREATE UNIQUE INDEX "SocioCooperado_cpf_or_cnpj_key" ON "SocioCooperado"("cpf_or_cnpj");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
