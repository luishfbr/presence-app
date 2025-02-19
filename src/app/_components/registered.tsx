"use client";

import React from "react";

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
    <>
      <div className="flex flex-col gap-6 text-center max-w-[80%]">
        <h1 className="text-6xl font-bold">Presença registrada!</h1>
        <span className="text-muted-foreground text-xl">
          Aproveite ao máximo o nosso evento!
        </span>
      </div>
      <div className="flex text-center items-center justify-center h-32 w-32 mx-auto border border-border rounded-full">
        <p
          className={`w-full h-full flex items-center justify-center text-6xl ${
            countdown <= 5 ? "text-green-900" : ""
          } `}
        >
          {countdown}
        </p>
      </div>
    </>
  );
}
