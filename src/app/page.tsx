"use client";

import React, { useEffect, useRef } from "react";
import styles from "@/app/style/presence.module.css";
import { Button } from "@/components/ui/button";
import { verifyIfExists } from "./_actions/server";
import { Loader2 } from "lucide-react";
import FoundPage from "./_components/found";
import AlreadyRegistered from "./_components/already-registered";
import NotFound from "./_components/not-found";
import type { FoundData } from "@/lib/types";
import Registered from "./_components/registered";
import InputCpf from "@/components/input-cpf";
import NumericKeyboard from "@/components/numeric-keyboard";

export default function Page() {
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState("initial");
  const [foundData, setFoundData] = React.useState<FoundData>();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleVerify = async () => {
    try {
      setLoading(true);
      const res = await verifyIfExists(value as string);
      if (res?.status === 200) {
        setTimeout(() => {
          setFoundData(res.data);
          setPage("found");
          setValue("");
          setLoading(false);
        }, 1000);
      }

      if (res?.status === 402) {
        setTimeout(() => {
          setPage("already-registered");
          setValue("");
          setLoading(false);
        }, 1000);
      }

      if (res?.status === 404) {
        setTimeout(() => {
          setPage("not-found");
          setValue("");
          setLoading(false);
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
        <div className="justify-center items-center mx-auto w-full h-full flex flex-row">
          <div className="flex w-[70%] items-center justify-center border border-border rounded-md h-full">
            1
          </div>
          <div className="flex w-[30%] items-center justify-center border border-border rounded-md h-full">
            <NumericKeyboard />
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
