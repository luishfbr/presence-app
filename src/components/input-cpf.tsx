"use client";

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

    return formatted.length > 0 ? (
      <>
        <p className={styles.pnumbers}>{formatted[0]}</p>
        <p className={styles.pnumbers}>{formatted[1]}</p>
        <p className={styles.pnumbers}>{formatted[2]}</p>
        <p className={styles.pnumbers}>{formatted[3]}</p>
        <p className={styles.pnumbers}>{formatted[4]}</p>
        <p className={styles.pnumbers}>{formatted[5]}</p>
        <p className={styles.pnumbers}>{formatted[6]}</p>
        <p className={styles.pnumbers}>{formatted[7]}</p>
        <p className={styles.pnumbers}>{formatted[8]}</p>
        <p className={styles.pnumbers}>{formatted[9]}</p>
        <p className={styles.pnumbers}>{formatted[10]}</p>
      </>
    ) : (
      <p className={styles.p}>Digite seu CPF</p>
    );
  };

  return (
    <div className={styles.divinput}>
      {formatCpf(getMaskedCpf(cpf))}
    </div>
  );
}
