"use client";

import React from "react";

interface NotFoundProps {
  onTimeout: () => void;
}

export default function NotFound({ onTimeout }: NotFoundProps) {
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
    <>
      <div className="flex flex-col gap-6 text-center max-w-[80%]">
        <h1 className="text-6xl font-bold">CPF não encontrado!</h1>
        <span className="text-muted-foreground text-xl">
          Infelizmente não encontramos registro do valor informado em nosso
          banco de dados, mas não se preocupe, procure um de nossos ajudantes e
          faremos o possível para converter esta situação!
        </span>
      </div>
      <div className="flex text-center items-center justify-center h-32 w-32 mx-auto border border-border rounded-full">
        <p
          className={`w-full h-full flex items-center justify-center text-6xl ${
            countdown <= 5 ? "text-red-500" : ""
          } `}
        >
          {countdown}
        </p>
      </div>
    </>
  );
}
