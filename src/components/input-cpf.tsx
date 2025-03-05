"use client";

import { Dot, Minus } from "lucide-react";
import React from "react";
import styles from "@/app/style/presence.module.css";

interface InputCpfProps {
  cpf: string;
}

export default function InputCpf({ cpf }: InputCpfProps) {
  const getMaskedCpf = (cpf: string) => {
    if (cpf.length === 0) return "";

    const visibleDigits = 3;
    const maskedCpf = cpf.split("");

    if (cpf.length > visibleDigits) {
      const maskStart = Math.max(0, cpf.length - visibleDigits);
      for (let i = 0; i < maskStart; i++) {
        maskedCpf[i] = "*";
      }
    }

    return maskedCpf.join("");
  };

  const formatCpf = (maskedCpf: string) => {
    const formatted = maskedCpf.padEnd(11, "");

    return (
      <>
        <p className={styles.inputCpf}>{formatted[0]}</p>
        <p className={styles.inputCpf}>{formatted[1]}</p>
        <p className={styles.inputCpf}>{formatted[2]}</p>
        <Dot className={styles.icons} />
        <p className={styles.inputCpf}>{formatted[3]}</p>
        <p className={styles.inputCpf}>{formatted[4]}</p>
        <p className={styles.inputCpf}>{formatted[5]}</p>
        <Dot className={styles.icons} />
        <p className={styles.inputCpf}>{formatted[6]}</p>
        <p className={styles.inputCpf}>{formatted[7]}</p>
        <p className={styles.inputCpf}>{formatted[8]}</p>
        <Minus className={styles.icons} />
        <p className={styles.inputCpf}>{formatted[9]}</p>
        <p className={styles.inputCpf}>{formatted[10]}</p>
      </>
    );
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <div className="flex flex-row gap-2 justify-center items-center">
        {formatCpf(getMaskedCpf(cpf))}
      </div>
    </div>
  );
}
