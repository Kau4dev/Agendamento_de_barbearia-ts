-- CreateEnum
CREATE TYPE "StatusAgendamento" AS ENUM ('PENDENTE', 'CONFIRMADO', 'CANCELADO', 'CONCLUIDO');

-- CreateTable
CREATE TABLE "agendamentos" (
    "id" SERIAL NOT NULL,
    "nomeCliente" TEXT NOT NULL,
    "telefoneCliente" TEXT NOT NULL,
    "nomeBarbeiro" TEXT NOT NULL,
    "nomeServico" TEXT NOT NULL,
    "duracaoEmMinutos" INTEGER NOT NULL,
    "precoServico" DOUBLE PRECISION NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL,
    "status" "StatusAgendamento" NOT NULL DEFAULT 'PENDENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agendamentos_pkey" PRIMARY KEY ("id")
);
