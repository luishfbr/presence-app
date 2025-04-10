"use client";

import React from "react";
import styles from "@/app/style/presence.module.css";
import ReturnButton from "@/components/return-button";
import Count from "@/components/count";

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
    <div className="flex flex-col gap-[10vh] items-center justify-center">
      <ReturnButton onClick={onTimeout} />
      <div className="flex flex-col gap-[2vh] text-center">
        <h1 className={styles.alreadyRegisteredh1}>
          Identificamos que seu cadastro, <br /> já está registrado!
        </h1>
        <span className={styles.alreadyRegisteredspan}>
          Conte com nossa equipe para solucionar sua questão da melhor forma.
        </span>
        <span className={styles.alreadyRegisteredspan}>
          Atenção: Informamos que a reutilização do CPF é proibida.
        </span>
      </div>
      <Count countdown={countdown} loading={false} />
    </div>
  );
}
