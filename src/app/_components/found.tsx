import { Button } from "@/components/ui/button";
import type { FoundData } from "@/lib/types";
import { ArrowLeft, Loader2 } from "lucide-react";
import React from "react";
import { registryPresence } from "../_actions/server";

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
    <>
      <Button
        onClick={onTimeout}
        className="absolute top-2 left-2 m-4 font-bold"
        variant={"outline"}
      >
        <ArrowLeft /> Não sou eu...
      </Button>
      <div className="flex flex-col gap-4 text-center max-w-[80%]">
        <h1 className="text-4xl font-bold">
          Olá,{" "}
          {data?.name
            .split(" ")
            .map((n, i, arr) =>
              i === 0 || i === arr.length - 1 ? n : n[0] + "."
            )
            .join(" ")}
        </h1>
        <h3 className="text-2xl text-muted-foreground">
          É um grande prazer recebê-lo em nossa assembléia, clique em *VALIDAR
          ENTRADA* para confirmar sua presença.
        </h3>
      </div>
      <Button disabled={loading} onClick={handleConfirm}>
        {loading ? (
          <Loader2 className="animate-spin h-10 w-10" />
        ) : (
          "VALIDAR ENTRADA"
        )}
      </Button>
      <div className="flex text-center items-center justify-center h-32 w-32 mx-auto border border-border rounded-full">
        <p
          className={`w-full h-full flex items-center justify-center text-6xl ${
            countdown <= 5 ? "text-red-500" : ""
          } ${loading === true ? "text-gray-500" : ""}`}
        >
          {countdown}
        </p>
      </div>
    </>
  );
}
