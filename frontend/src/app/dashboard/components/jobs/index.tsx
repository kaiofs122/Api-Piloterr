"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { RefreshCw } from "lucide-react";
import { api } from "@/services/api";
import { toast } from "sonner";

interface Job {
  id: string;
  titulo: string;
  empresa: string;
  empresaURL: string;
  localizacao: string;
}

export function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const [palavraChave, setPalavraChave] = useState("");
  const [localizacao, setLocalizacao] = useState("");

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params: any = {};

      if (palavraChave) {
        params.palavraChave = palavraChave;
      }

      if (localizacao) {
        params.localizacao = localizacao;
      }

      const response = await api.get("/jobs/all", { params });
      setJobs(response.data);
    } catch (error) {
      console.error("Erro ao buscar vagas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []); 

  const handleApply = async (jobId: string) => {
    try {
      const response = await api.post("/application", {
        jobId,
      });
      toast.success("Candidatura realizada com sucesso!");
      setIsPopupOpen(false);
    } catch (error: any) {
      toast.error("Erro ao candidatar: " + error.response.data.message);
    }
  };

  return (
    <main className={styles.container}>
      <section className={styles.containerHeader}>
        <h1>Vagas</h1>
        <button onClick={() => window.location.reload()}>
          <RefreshCw size={24} color="#4a90e2" />
        </button>
      </section>

      <section className={styles.filters}>
        <input
          type="text"
          placeholder="Buscar por palavra-chave"
          value={palavraChave}
          onChange={(e) => setPalavraChave(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Filtrar por localização"
          value={localizacao}
          onChange={(e) => setLocalizacao(e.target.value)}
          className={styles.input}
        />
        <button onClick={fetchJobs} className={styles.filterButton}>
          Aplicar Filtros
        </button>
      </section>

      {loading ? (
        <p>Carregando vagas...</p>
      ) : jobs.length === 0 ? (
        <p>Nenhuma vaga disponível.</p>
      ) : (
        <section className={styles.listJobs}>
          {jobs.map((job) => (
            <button
              key={job.id}
              className={styles.jobItem}
              onClick={() => {
                setSelectedJob(job);
                setIsPopupOpen(true);
              }}
            >
              <div className={styles.tag}></div>
              <div className={styles.jobContent}>
                <h3>{job.titulo}</h3>
                <p>
                  <strong>Empresa:</strong> {job.empresa}
                </p>
                <p>
                  <strong>Localização:</strong> {job.localizacao}
                </p>
                <a href={job.empresaURL} target="_blank" rel="noopener noreferrer">
                  {job.empresaURL}
                </a>
              </div>
            </button>
          ))}
        </section>
      )}

      {isPopupOpen && selectedJob && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Confirmar Candidatura</h3>
            <p>Você deseja se candidatar para a vaga: {selectedJob.titulo}?</p>
            <button onClick={() => handleApply(selectedJob.id)}>Confirmar</button>
            <button onClick={() => setIsPopupOpen(false)}>Fechar</button>
          </div>
        </div>
      )}
    </main>
  );
}
