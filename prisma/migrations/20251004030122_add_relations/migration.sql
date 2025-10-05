/*
  Warnings:

  - You are about to drop the column `duracaoEmMinutos` on the `agendamentos` table. All the data in the column will be lost.
  - You are about to drop the column `nomeBarbeiro` on the `agendamentos` table. All the data in the column will be lost.
  - You are about to drop the column `nomeCliente` on the `agendamentos` table. All the data in the column will be lost.
  - You are about to drop the column `nomeServico` on the `agendamentos` table. All the data in the column will be lost.
  - You are about to drop the column `precoServico` on the `agendamentos` table. All the data in the column will be lost.
  - You are about to drop the column `telefoneCliente` on the `agendamentos` table. All the data in the column will be lost.
  - Added the required column `servicoId` to the `agendamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `agendamentos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "agendamentos" DROP COLUMN "duracaoEmMinutos",
DROP COLUMN "nomeBarbeiro",
DROP COLUMN "nomeCliente",
DROP COLUMN "nomeServico",
DROP COLUMN "precoServico",
DROP COLUMN "telefoneCliente",
ADD COLUMN     "servicoId" INTEGER NOT NULL,
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
