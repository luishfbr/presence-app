"use client";

import { Dot, Minus } from "lucide-react";
import React, { useEffect } from "react";
import styles from "@/app/style/presence.module.css";

interface InputCpfProps {
  onSetCpf: (cpf: string) => void;
}

export default function InputCpf({ onSetCpf }: InputCpfProps) {
  const [cpf, setCpf] = React.useState("");

  const handleButtonClick = (value: number) => {
    setCpf((prevCpf) =>
      prevCpf.length < 11 ? prevCpf + value.toString() : prevCpf
    );
  };

  const handleDeleteClick = () => {
    setCpf((prevCpf) => prevCpf.slice(0, -1));
  };

  useEffect(() => {
    onSetCpf(cpf);
  }, [cpf, onSetCpf]);

  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <div className="flex flex-row gap-1 justify-center items-end">
        <p className={styles.inputCpf}>{cpf[0]}</p>
        <p className={styles.inputCpf}>{cpf[1]}</p>
        <p className={styles.inputCpf}>{cpf[2]}</p>
        <Dot />
        <p className={styles.inputCpf}>{cpf[3]}</p>
        <p className={styles.inputCpf}>{cpf[4]}</p>
        <p className={styles.inputCpf}>{cpf[5]}</p>
        <Dot />
        <p className={styles.inputCpf}>{cpf[6]}</p>
        <p className={styles.inputCpf}>{cpf[7]}</p>
        <p className={styles.inputCpf}>{cpf[8]}</p>
        <Minus />
        <p className={styles.inputCpf}>{cpf[9]}</p>
        <p className={styles.inputCpf}>{cpf[10]}</p>
      </div>
      <div className="flex flex-row justify-center gap-1">
        <button
          onClick={() => handleButtonClick(1)}
          className={styles.buttonCpf}
        >
          1
        </button>
        <button
          onClick={() => handleButtonClick(2)}
          className={styles.buttonCpf}
        >
          2
        </button>
        <button
          onClick={() => handleButtonClick(3)}
          className={styles.buttonCpf}
        >
          3
        </button>
        <button
          onClick={() => handleButtonClick(4)}
          className={styles.buttonCpf}
        >
          4
        </button>
        <button
          onClick={() => handleButtonClick(5)}
          className={styles.buttonCpf}
        >
          5
        </button>
        <button
          onClick={() => handleButtonClick(6)}
          className={styles.buttonCpf}
        >
          6
        </button>
        <button
          onClick={() => handleButtonClick(7)}
          className={styles.buttonCpf}
        >
          7
        </button>
        <button
          onClick={() => handleButtonClick(8)}
          className={styles.buttonCpf}
        >
          8
        </button>
        <button
          onClick={() => handleButtonClick(9)}
          className={styles.buttonCpf}
        >
          9
        </button>
        <button
          onClick={() => handleButtonClick(0)}
          className={styles.buttonCpf}
        >
          0
        </button>
        <button onClick={handleDeleteClick} className={styles.deleteButton}>
          APAGAR
        </button>
      </div>
    </div>
  );
}
