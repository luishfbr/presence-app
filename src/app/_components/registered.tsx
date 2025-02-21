"use client";

import React from "react";

interface RegisteredProps {
  onTimeout: () => void;
}

export default function Registered({ onTimeout }: RegisteredProps) {
  const [countdown, setCountdown] = React.useState<number>(10);

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
    <div className="flex flex-col gap-52 items-center justify-center w-full">
      <div className="flex flex-col gap-4 text-center max-w-[50%]">
        <h1 className="text-6xl font-bold text-white">
          Presença registrada com sucesso!
        </h1>
        <span className="text-white/90 text-3xl">
          Pegue sua pulseira e aproveite ao máximo nosso evento!
        </span>
      </div>
      <div className="flex text-center items-center gap-1 justify-center">
        <span className="text-nowrap text-xl">
          Retornando para a página principal em
        </span>
        <p className={`text-xl ${countdown <= 5 ? "text-green-400" : ""} `}>
          {countdown} segundos...
        </p>
      </div>
    </div>
  );
}
