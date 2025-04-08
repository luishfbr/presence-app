-- CreateTable
CREATE TABLE "Cooperado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cpf_or_cnpj" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Convidado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cpf_or_cnpj" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SocioCooperado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cooperadoId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf_or_cnpj" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ListaDePresenca" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cooperadoId" TEXT,
    "name" TEXT NOT NULL,
    "cpf_or_cnpj" TEXT NOT NULL,
    "mode" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Cooperado_cpf_or_cnpj_key" ON "Cooperado"("cpf_or_cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Convidado_cpf_or_cnpj_key" ON "Convidado"("cpf_or_cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "SocioCooperado_cpf_or_cnpj_key" ON "SocioCooperado"("cpf_or_cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "ListaDePresenca_cpf_or_cnpj_key" ON "ListaDePresenca"("cpf_or_cnpj");
