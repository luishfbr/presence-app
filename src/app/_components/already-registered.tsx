"use client";

import React from "react";

interface AlreadyRegisteredProps {
  onTimeout: () => void;
}

export default function AlreadyRegistered({
  onTimeout,
}: AlreadyRegisteredProps) {
  const [countdown, setCountdown] = React.useState<number>(20);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          onTimeout();
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeout]);

  return (
    <div className="flex flex-col gap-40 items-center justify-center">
      <div className="flex flex-col gap-10 text-center max-w-[70%]">
        <h1 className="text-6xl font-bold">
          O valor inserido já se encontra registrado em nosso sistema
        </h1>
        <span className="text-white/90 text-4xl">
          Fique tranquilo, nossa equipe estará à disposição para entender e
          resolver sua situação. <br />
          Apenas cooperados possuem acesso ao nosso evento!
        </span>
        <span className="font-bold text-3xl">Extritamente proibido a reutilização de CPF</span>
      </div>
      <div className="flex text-center items-center gap-1 justify-center">
        <span className="text-nowrap text-xl">
          Retornando para a página principal em
        </span>
        <p className={`text-xl ${countdown <= 5 ? "text-red-400" : ""} `}>
          {countdown} segundos...
        </p>
      </div>
    </div>
  );
}
