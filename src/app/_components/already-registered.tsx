"use client";

import React from "react";
import styles from "@/app/style/presence.module.css";
import ReturnButton from "@/components/return-button";

interface AlreadyRegisteredProps {
  onTimeout: () => void;
}

export default function AlreadyRegistered({
  onTimeout,
}: AlreadyRegisteredProps) {
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
    <div className="flex flex-col gap-40 items-center justify-center">
      <ReturnButton onClick={onTimeout} />
      <div className="flex flex-col gap-10 text-center">
        <h1 className={styles.alreadyRegisteredh1}>
          O valor inserido, <br /> já se encontra registrado em nosso sistema
        </h1>
        <span className={styles.alreadyRegisteredspan}>
          Fique tranquilo, nossa equipe estará à disposição <br /> para entender
          e resolver sua situação. <br />
          Apenas cooperados possuem acesso ao nosso evento!
        </span>
        <span className={styles.alreadyRegisteredspan}>
          Extritamente proibido a reutilização de CPF
        </span>
      </div>
      <div className="flex text-center items-center gap-1 justify-center">
        <span className="text-nowrap text-gray-500 text-xl">
          Retornando automaticamente para a página principal em
        </span>
        <p
          className={`text-xl text-gray-500 ${
            countdown <= 5 ? "text-red-400" : ""
          } `}
        >
          {countdown} segundos...
        </p>
      </div>
    </div>
  );
}
