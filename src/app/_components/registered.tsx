"use client";

import React from "react";
import ReturnButton from "@/components/return-button";
import styles from "@/app/style/presence.module.css";
import Count from "@/components/count";

interface RegisteredProps {
  onTimeout: () => void;
}

export default function Registered({ onTimeout }: RegisteredProps) {
  const [countdown, setCountdown] = React.useState<number>(5);

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
    <div className="flex flex-col gap-[4vh] items-center justify-center w-full">
      <ReturnButton onClick={onTimeout} />
      <div className="flex flex-col gap-[4vh] text-center">
        <h1 className={styles.alreadyRegisteredh1}>
          Presença registrada com sucesso!
        </h1>
        <span className={styles.alreadyRegisteredspan}>
          Pegue sua pulseira e <br />
          aproveite ao máximo nosso evento!
        </span>
      </div>
      <Count countdown={countdown} loading={false} />
    </div>
  );
}
