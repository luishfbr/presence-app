"use client";

import React from "react";
import styles from "@/app/style/presence.module.css";
import ReturnButton from "@/components/return-button";
import Count from "@/components/count";

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
    <div className="flex flex-col gap-[10vh] items-center justify-center">
      <ReturnButton onClick={onTimeout} />
      <div className="flex flex-col gap-[4vh] text-center">
        <h1 className={styles.alreadyRegisteredh1}>
          Que pena! Seu CPF não foi localizado em nossa base de cooperados.{" "}
          <br /> Nossa equipe está pronta para ajudar a entender e resolver essa
          questão.
        </h1>
        <span className={styles.alreadyRegisteredspan}>
          Atenção: Esta assembleia é exclusiva a cooperados do Sicoob Uberaba AG
          3178.
        </span>
      </div>
      <Count countdown={countdown} loading={false} />
    </div>
  );
}
