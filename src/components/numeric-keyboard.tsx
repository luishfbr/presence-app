"use client";

import React from "react";
import styles from "@/app/style/presence.module.css";

interface InputCpfProps {
  onSetCpf: (cpf: string) => void;
  isLoading: boolean;
}

export default function NumericKeyboard({
  onSetCpf,
  isLoading,
}: InputCpfProps) {
  const [cpf, setCpf] = React.useState("");

  const handleButtonClick = (value: number) => {
    setCpf((prevCpf) =>
      prevCpf.length < 11 ? prevCpf + value.toString() : prevCpf
    );
  };

  const handleDeleteClick = () => {
    setCpf((prevCpf) => prevCpf.slice(0, -1));
  };

  React.useEffect(() => {
    onSetCpf(cpf);
  }, [cpf, onSetCpf]);

  return (
    <div className={styles.keyboardDiv}>
      <table className="w-full h-full">
        <tbody>
          {/* Linha do botão "Apagar" */}
          <tr className="h-[20%]">
            <td className={styles.td}>
              <button
                className={styles.numericButton}
                disabled={cpf.length === 11}
                onClick={() => handleButtonClick(7)}
              >
                7
              </button>
            </td>
            <td className={styles.td}>
              <button
                className={styles.numericButton}
                disabled={cpf.length === 11}
                onClick={() => handleButtonClick(8)}
              >
                8
              </button>
            </td>
            <td className={styles.td}>
              <button
                className={styles.numericButton}
                disabled={cpf.length === 11}
                onClick={() => handleButtonClick(9)}
              >
                9
              </button>
            </td>
          </tr>
          <tr className="h-[20%]">
            <td className={styles.td}>
              <button
                className={styles.numericButton}
                disabled={cpf.length === 11}
                onClick={() => handleButtonClick(4)}
              >
                4
              </button>
            </td>
            <td className={styles.td}>
              <button
                className={styles.numericButton}
                disabled={cpf.length === 11}
                onClick={() => handleButtonClick(5)}
              >
                5
              </button>
            </td>
            <td className={styles.td}>
              <button
                className={styles.numericButton}
                disabled={cpf.length === 11}
                onClick={() => handleButtonClick(6)}
              >
                6
              </button>
            </td>
          </tr>
          <tr className="h-[20%]">
            <td className={styles.td}>
              <button
                className={styles.numericButton}
                disabled={cpf.length === 11}
                onClick={() => handleButtonClick(1)}
              >
                1
              </button>
            </td>
            <td className={styles.td}>
              <button
                className={styles.numericButton}
                disabled={cpf.length === 11}
                onClick={() => handleButtonClick(2)}
              >
                2
              </button>
            </td>
            <td className={styles.td}>
              <button
                className={styles.numericButton}
                disabled={cpf.length === 11}
                onClick={() => handleButtonClick(3)}
              >
                3
              </button>
            </td>
          </tr>
          <tr className="h-[20%]">
            <td className={styles.td}>
              <button
                className={styles.numericButton}
                disabled={cpf.length === 11}
                onClick={() => handleButtonClick(0)}
              >
                0
              </button>
            </td>
            <td className={styles.td} colSpan={2}>
              <button
                disabled={cpf.length < 1 || isLoading}
                onClick={handleDeleteClick}
                className={styles.deleteButton}
              >
                Apagar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
