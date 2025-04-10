"use client";

import React, { useEffect, useRef } from "react";
import styles from "@/app/style/presence.module.css";
import { verifyIfExists } from "./_actions/server";
import FoundPage from "./_components/found";
import AlreadyRegistered from "./_components/already-registered";
import NotFound from "./_components/not-found";
import type { FoundData } from "@/lib/types";
import Registered from "./_components/registered";
import InputCpf from "@/components/input-cpf";
import NumericKeyboard from "@/components/numeric-keyboard";
import { Loader2 } from "lucide-react";

export default function Page() {
  const [value, setValue] = React.useState("");
  const [page, setPage] = React.useState("initial");
  const [foundData, setFoundData] = React.useState<FoundData>();
  const [isLoading, setIsLoading] = React.useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleVerify = async () => {
    try {
      setIsLoading(true);
      const res = await verifyIfExists(value as string);
      if (res?.status === 200) {
        setTimeout(() => {
          const data = {
            id: res.data?.id as number,
            name: res.data?.name as string,
            cpf_or_cnpj: res.data?.cpf_or_cnpj as string,
            type: res.type as string,
          };
          setFoundData(data);
          setIsLoading(false);
          setPage("found");
          setValue("");
        }, 1000);
      }

      if (res?.status === 402) {
        setTimeout(() => {
          setIsLoading(false);
          setPage("already-registered");
          setValue("");
        }, 1000);
      }

      if (res?.status === 404) {
        setTimeout(() => {
          setIsLoading(false);
          setPage("not-found");
          setValue("");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Ajuste de foco
  useEffect(() => {
    // Quando o valor tiver 11 caracteres, o foco vai para o botão
    if (value.length === 11 && buttonRef.current) {
      buttonRef.current.focus();
    } else if (value.length < 11 && buttonRef.current) {
      // Se o valor tiver menos de 11 caracteres, o foco volta para o primeiro input
      const firstInput = document.querySelector("input") as HTMLInputElement;
      firstInput?.focus();
    }
  }, [value]);

  return (
    <div className={styles.background}>
      {page === "initial" && (
        <div className="justify-center items-center w-full h-full flex flex-col">
          <div className="flex flex-col gap-[4.5vh] items-center w-full justify-center h-[80%]">
            <div className={styles.titlediv}>
              <h1 className={styles.h1}>Bem-vindo(a)</h1>
              <span className={styles.span}>Assembleia Geral 2025</span>
            </div>
            <InputCpf cpf={value} />
            <NumericKeyboard onSetCpf={setValue} isLoading={isLoading} />
            <button
              onClick={handleVerify}
              disabled={value.length < 11 || isLoading}
              className={styles.verifyButton}
            >
              {isLoading ? (
                <Loader2 className="h-[6vh] w-[7vw] animate-spin" />
              ) : (
                "Verificar"
              )}
            </button>
          </div>
        </div>
      )}
      {page === "found" && (
        <FoundPage
          onRegister={() => setPage("registered")}
          onTimeout={() => setPage("initial")}
          data={foundData || null}
        />
      )}
      {page === "already-registered" && (
        <AlreadyRegistered onTimeout={() => setPage("initial")} />
      )}
      {page === "not-found" && (
        <NotFound onTimeout={() => setPage("initial")} />
      )}
      {page === "registered" && (
        <Registered onTimeout={() => setPage("initial")} />
      )}
    </div>
  );
}
