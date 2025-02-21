"use client";

import React, { useEffect, useRef } from "react";
import styles from "@/app/style/presence.module.css";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSeparatorDot,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { verifyIfExists } from "./_actions/server";
import { Loader2 } from "lucide-react";
import FoundPage from "./_components/found";
import AlreadyRegistered from "./_components/already-registered";
import NotFound from "./_components/not-found";
import type { FoundData } from "@/lib/types";
import Registered from "./_components/registered";

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
        <>
          <div className="flex flex-col gap-10 items-center">
            <div className="flex flex-col text-center max-w-[70%]">
              <h1 className="text-8xl font-bold text-white">SEJA BEM-VINDO</h1>
              <h2 className="text-4xl font-bold text-white">
                à Assembleia Geral do Sicoob Uberaba de 2025.
              </h2>
            </div>
            <div className="text-center max-w-[50%]">
              <p className="text-gray-200 text-[27px]">
                Acesso exclusivo para cooperados. <br />
                Insira seu CPF e clique em VERIFICAR REGISTRO para confirmar seu
                cadastro em nossa base de dados.
              </p>
            </div>
          </div>
          <InputOTP
            autoComplete="off"
            maxLength={11}
            value={value}
            onChange={(e) => setValue(e)}
            autoFocus
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparatorDot />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
            <InputOTPSeparatorDot />
            <InputOTPGroup>
              <InputOTPSlot index={6} />
              <InputOTPSlot index={7} />
              <InputOTPSlot index={8} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={9} />
              <InputOTPSlot index={10} />
            </InputOTPGroup>
          </InputOTP>
          <Button
            ref={buttonRef}
            disabled={value.length !== 11 || loading}
            onClick={handleVerify}
            variant={"presence"}
            size={"presence"}
          >
            {!loading ? (
              "VERIFICAR REGISTRO"
            ) : (
              <Loader2 className="animate-spin h-16 w-16" />
            )}
          </Button>
          <span className="fixed bottom-0 left-0 right-0 text-center mb-2 text-gray-400">
            © 2025 Sicoob Uberaba. Todos os direitos reservados.
          </span>
        </>
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
