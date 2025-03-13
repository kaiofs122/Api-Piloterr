-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "empresaURL" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "descricao" TEXT,
    "dataPublicacao" TIMESTAMP(3) NOT NULL,
    "dataCriacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL,
    "dataCandidatura" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "usuario_Id" TEXT NOT NULL,
    "job_Id" TEXT NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_usuario_Id_fkey" FOREIGN KEY ("usuario_Id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_job_Id_fkey" FOREIGN KEY ("job_Id") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
