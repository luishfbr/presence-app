"use client";

import React from "react";
import ReturnButton from "@/components/return-button";
import styles from "@/app/style/presence.module.css";
import Count from "@/components/count";
import { Smile } from "lucide-react";

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
    <div className="flex flex-col gap-[10vh] items-center justify-center w-full">
      <ReturnButton onClick={onTimeout} />
      <div className="flex flex-col text-center">
        <div className="flex flex-row gap-[1vw] items-center justify-center">
          <h1 className={styles.alreadyRegisteredh1}>Presença registrada</h1>
          <Smile fill="yellow" className="w-[6vw] h-[6vh] text-black" />
        </div>
        <span className={styles.alreadyRegisteredspan}>
          Retire sua pulseira e aproveite a noite.
        </span>
      </div>
      <Count countdown={countdown} loading={false} />
    </div>
  );
}
