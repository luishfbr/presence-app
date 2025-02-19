"use client";

import React, { useEffect, useRef } from "react";

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
    <div className="flex flex-col gap-10 items-center justify-center h-screen mx-auto">
      {page === "initial" && (
        <>
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-6xl font-bold">Seja bem-vindo!</h1>
            <h3 className="text-muted-foreground text-xl">
              Insira um CPF ou CNPJ para prosseguir.
            </h3>
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
            disabled={value.length !== 11}
            onClick={handleVerify}
          >
            {!loading ? (
              "VERIFICAR"
            ) : (
              <Loader2 className="animate-spin h-10 w-10" />
            )}
          </Button>
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
