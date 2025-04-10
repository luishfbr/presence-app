"use client";

import type { FoundData } from "@/lib/types";
import { Loader2 } from "lucide-react";
import React from "react";
import { registryPresence } from "../_actions/server";
import styles from "@/app/style/presence.module.css";
import ReturnButton from "@/components/return-button";
import Count from "@/components/count";

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
  const [countdown, setCountdown] = React.useState<number>(10);
  const [loading, setLoading] = React.useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const dataToPresence = {
        name: data?.name as string,
        cpfOrCnpj: data?.cpf_or_cnpj as string,
        cooperadoId: "",
        type: data?.type as string,
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
    <div className="flex flex-col items-center justify-center gap-[14vh]">
      <ReturnButton onClick={onTimeout} />
      <div className="flex flex-col gap-[0.5vh] items-center">
        <div className="flex flex-col text-center">
          <h2 className={styles.foundh2}>{data?.name},</h2>
        </div>
        <div className={styles.foundspan}>
          clique no botão abaixo para validar sua entrada.
        </div>
      </div>
      <button
        disabled={loading}
        onClick={handleConfirm}
        className={styles.validateButton}
      >
        {loading ? (
          <Loader2 className="animate-spin h-16 w-16" />
        ) : (
          "VALIDAR ENTRADA"
        )}
      </button>
      <Count countdown={countdown} loading={loading} />
    </div>
  );
}
