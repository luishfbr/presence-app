/*
  Warnings:

  - Added the required column `cooperadoId` to the `SocioCooperado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ListaDePresenca" ADD COLUMN "cooperadoId" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SocioCooperado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cooperadoId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf_or_cnpj" TEXT NOT NULL
);
INSERT INTO "new_SocioCooperado" ("cpf_or_cnpj", "id", "name") SELECT "cpf_or_cnpj", "id", "name" FROM "SocioCooperado";
DROP TABLE "SocioCooperado";
ALTER TABLE "new_SocioCooperado" RENAME TO "SocioCooperado";
CREATE UNIQUE INDEX "SocioCooperado_cpf_or_cnpj_key" ON "SocioCooperado"("cpf_or_cnpj");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
