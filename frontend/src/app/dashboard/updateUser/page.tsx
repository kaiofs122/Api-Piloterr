"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api"; 
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import { toast } from "sonner"; 

export default function UpdateUser() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await api.get("/me");
        setNome(response.data.nome);
        setEmail(response.data.email);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        toast.error("Erro ao carregar dados do usuário."); 
      }
    };

    loadUserData();
  }, []);

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put("/users/update", {
        nome,
        email,
        senha,
      });

      toast.success("Dados atualizados com sucesso!"); 
      router.push("/dashboard"); 
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao atualizar dados"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <h1>Atualizar Dados</h1>
      </div>
      <form onSubmit={handleUpdateUser} className={styles.form}>
        <input
          type="text"
          name="nome"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          name="senha"
          placeholder="Digite sua nova senha (opcional)"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Atualizando..." : "Atualizar"}
        </button>
      </form>
    </div>
  );
}
