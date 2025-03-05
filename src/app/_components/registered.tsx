"use client";

import React from "react";
import ReturnButton from "@/components/return-button";
import styles from "@/app/style/presence.module.css";

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
      <ReturnButton onClick={onTimeout} />
      <div className="flex flex-col gap-20 text-center">
        <h1 className={styles.alreadyRegisteredh1}>
          Presença registrada com sucesso!
        </h1>
        <span className={styles.alreadyRegisteredspan}>
          Pegue sua pulseira e <br />
          aproveite ao máximo nosso evento!
        </span>
      </div>
      <div className="flex text-center items-center gap-1 justify-center">
        <span className="text-nowrap text-xl text-gray-500">
          Retornando automaticamente para a página principal em
        </span>
        <p
          className={`text-xl text-gray-500 ${
            countdown <= 5 ? "text-green-400" : ""
          } `}
        >
          {countdown} segundos...
        </p>
      </div>
    </div>
  );
}
