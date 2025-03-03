"use client";

import React from "react";
import styles from "@/app/style/presence.module.css";

interface InputCpfProps {
  confirm: (cpf: string) => void; 
  handleSetCpf: (cpf: string) => void;
}

export default function NumericKeyboard({ confirm }: InputCpfProps) {
  const [cpf, setCpf] = React.useState("");

  const handleConfirm = () => {
    confirm(cpf);
  };

  const handleButtonClick = (value: number) => {
    setCpf((prevCpf) =>
      prevCpf.length < 11 ? prevCpf + value.toString() : prevCpf
    );
  };

  const handleDeleteClick = () => {
    setCpf((prevCpf) => prevCpf.slice(0, -1));
  };

  return (
    <div className={styles.keyboardDiv}>
      <div className="flex flex-row w-full h-[20%] ">
        <p className="w-[25%]">{""}</p>
        <p className="w-[25%]">{""}</p>
        <button onClick={handleDeleteClick} className={styles.buttonApagar}>
          Apagar
        </button>
      </div>
      <div className="flex w-full h-[20%] ">
        <button
          onClick={() => handleButtonClick(7)}
          className={styles.button25}
        >
          7
        </button>
        <button
          onClick={() => handleButtonClick(8)}
          className={styles.button25}
        >
          8
        </button>
        <button
          onClick={() => handleButtonClick(9)}
          className={styles.button25}
        >
          9
        </button>
        <button disabled className={styles.disabledButton1}>
          {""}
        </button>
      </div>
      <div className="flex w-full h-[20%] ">
        <button
          onClick={() => handleButtonClick(4)}
          className={styles.button25}
        >
          4
        </button>
        <button
          onClick={() => handleButtonClick(5)}
          className={styles.button25}
        >
          5
        </button>
        <button
          onClick={() => handleButtonClick(6)}
          className={styles.button25}
        >
          6
        </button>
        <button disabled className={styles.disabledButton1}>
          {""}
        </button>
      </div>
      <div className="w-full h-[40%] flex flex-row">
        <div className="w-full">
          <div className="flex w-full h-[50%]">
            <button
              onClick={() => handleButtonClick(1)}
              className={styles.button33}
            >
              1
            </button>
            <button
              onClick={() => handleButtonClick(2)}
              className={styles.button33}
            >
              2
            </button>
            <button
              onClick={() => handleButtonClick(3)}
              className={styles.button33}
            >
              3
            </button>
          </div>
          <div className="flex w-full h-[50%] ">
            <button
              onClick={() => handleButtonClick(0)}
              className={styles.button66}
            >
              0
            </button>
            <button disabled className={styles.disabledButton2}>
              {""}
            </button>
          </div>
        </div>
        <button
          onClick={() => handleConfirm()}
          className={styles.buttonAvancar}
        >
          Avançar
        </button>
      </div>
    </div>
  );
}
