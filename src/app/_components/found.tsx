"use client";

import type { FoundData } from "@/lib/types";
import { Loader2 } from "lucide-react";
import React from "react";
import { registryPresence } from "../_actions/server";
import styles from "@/app/style/presence.module.css";
import ReturnButton from "@/components/return-button";

interface FoundPageProps {
  data: FoundData | null;
  onTimeout: () => void;
  onRegister: () => void;
}

export default function FoundPage({
  data,
  onTimeout,
  onRegister,
}: FoundPageProps) {
  const [countdown, setCountdown] = React.useState<number>(20);
  const [loading, setLoading] = React.useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const dataToPresence = {
        name: data?.name as string,
        cpfOrCnpj: data?.cpf_or_cnpj as string,
        cooperadoId: "",
      };

      const res = await registryPresence(dataToPresence);
      if (res?.status === 200) {
        setTimeout(() => {
          setLoading(false);
          onRegister();
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao validar entrada, tente novamente.");
      onTimeout();
    }
  };

  // Timer de 20 segundos para registrar a presença caso contrário, retornar para a página principal...
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (loading) {
          return prevCountdown;
        }

        if (prevCountdown <= 1) {
          clearInterval(timer);
          onTimeout();
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeout, loading]);

  // Caso chegue nulo, ele retorna para a página principal...
  React.useEffect(() => {
    if (data === null) {
      onTimeout();
    }
  });
  return (
    <div className="flex flex-col items-center justify-center gap-24">
      <ReturnButton onClick={onTimeout} />
      <div className="flex flex-col gap-10 items-center">
        <div className="flex flex-col gap-2 text-center">
          <h1 className={styles.foundh1}>Grande prazer em recebê-lo(a),</h1>
          <h2 className={styles.foundh2}>{data?.name}</h2>
        </div>
        <div className={styles.foundspan}>
          Clique no botão de VALIDAR PRESENÇA e aproveite nosso evento ao
          máximo.
        </div>
      </div>
      <button
        disabled={loading}
        onClick={handleConfirm}
        className={styles.verifyButton}
      >
        {loading ? (
          <Loader2 className="animate-spin h-16 w-16" />
        ) : (
          "VALIDAR ENTRADA"
        )}
      </button>
      <div className="flex text-center items-center gap-1 justify-center">
        <span className="text-nowrap text-gray-400 text-xl">
          Retornando para a página principal automaticamente em
        </span>
        <p
          className={`text-xl text-gray-400 ${
            countdown <= 5 ? "text-red-400" : ""
          } ${loading === true ? "text-gray-900" : ""}`}
        >
          {countdown} segundos...
        </p>
      </div>
    </div>
  );
}
