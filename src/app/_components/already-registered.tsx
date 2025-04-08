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
      <div className="flex flex-col gap-[4vh] text-center">
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
      <Count countdown={countdown} loading={false} />
    </div>
  );
}
