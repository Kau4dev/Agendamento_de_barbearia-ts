-- CreateTable
CREATE TABLE "agendas" (
    "id" SERIAL NOT NULL,
    "barbeiroId" INTEGER NOT NULL,
    "seg_inicio" TEXT,
    "seg_fim" TEXT,
    "ter_inicio" TEXT,
    "ter_fim" TEXT,
    "qua_inicio" TEXT,
    "qua_fim" TEXT,
    "qui_inicio" TEXT,
    "qui_fim" TEXT,
    "sex_inicio" TEXT,
    "sex_fim" TEXT,
    "sab_inicio" TEXT,
    "sab_fim" TEXT,
    "dom_inicio" TEXT,
    "dom_fim" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agendas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "agendas_barbeiroId_key" ON "agendas"("barbeiroId");

-- AddForeignKey
ALTER TABLE "agendas" ADD CONSTRAINT "agendas_barbeiroId_fkey" FOREIGN KEY ("barbeiroId") REFERENCES "Barbeiro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
