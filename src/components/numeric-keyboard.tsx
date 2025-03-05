"use client";

import React from "react";
import styles from "@/app/style/presence.module.css";
import { ArrowLeft, Loader2 } from "lucide-react";

interface InputCpfProps {
  confirm: (cpf: string) => void;
  onSetCpf: (cpf: string) => void;
}

export default function NumericKeyboard({ confirm, onSetCpf }: InputCpfProps) {
  const [cpf, setCpf] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleConfirm = () => {
    setIsLoading(true);
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

  React.useEffect(() => {
    onSetCpf(cpf);
  }, [cpf, onSetCpf]);

  return (
    <div className={styles.keyboardDiv}>
      <div className={styles.divTable}>
        <table className="w-full h-full">
          <tbody>
            {/* Linha do botão "Apagar" */}
            <tr className="h-[20%]">
              <td className="w-[50%] h-[20%] p-[2px] text-black" colSpan={2}>
                {""}
              </td>
              <td className="w-[50%] h-[20%] p-[2px]" colSpan={2}>
                <button
                  className={styles.numericButton}
                  onClick={handleDeleteClick}
                  disabled={cpf.length === 0 || isLoading}
                >
                  <ArrowLeft /> Apagar
                </button>
              </td>
            </tr>
            <tr className="h-[20%]">
              <td className="w-[25%] h-[20%] p-[2px]">
                <button
                  className={styles.numericButton}
                  onClick={() => handleButtonClick(7)}
                >
                  7
                </button>
              </td>
              <td className="w-[25%] h-[20%] p-[2px]">
                <button
                  className={styles.numericButton}
                  onClick={() => handleButtonClick(8)}
                >
                  8
                </button>
              </td>
              <td className="w-[25%] h-[20%] p-[2px]">
                <button
                  className={styles.numericButton}
                  onClick={() => handleButtonClick(9)}
                >
                  9
                </button>
              </td>
              <td className="w-[25%] h-[20%] p-[2px]">
                <button disabled className={styles.numericButton}>
                  +
                </button>
              </td>
            </tr>
            <tr className="h-[20%]">
              <td className="w-[25%] h-[20%] p-[2px]">
                <button
                  className={styles.numericButton}
                  onClick={() => handleButtonClick(4)}
                >
                  4
                </button>
              </td>
              <td className="w-[25%] h-[20%] p-[2px]">
                <button
                  className={styles.numericButton}
                  onClick={() => handleButtonClick(5)}
                >
                  5
                </button>
              </td>
              <td className="w-[25%] h-[20%] p-[2px]">
                <button
                  className={styles.numericButton}
                  onClick={() => handleButtonClick(6)}
                >
                  6
                </button>
              </td>
              <td className="w-[25%] h-[20%] p-[2px]">
                <button disabled className={styles.numericButton}>
                  .
                </button>
              </td>
            </tr>
            <tr className="h-[20%]">
              <td className="w-[25%] h-[20%] p-[2px]">
                <button
                  className={styles.numericButton}
                  onClick={() => handleButtonClick(1)}
                >
                  1
                </button>
              </td>
              <td className="w-[25%] h-[20%] p-[2px]">
                <button
                  className={styles.numericButton}
                  onClick={() => handleButtonClick(2)}
                >
                  2
                </button>
              </td>
              <td className="w-[25%] h-[20%] p-[2px]">
                <button
                  className={styles.numericButton}
                  onClick={() => handleButtonClick(3)}
                >
                  3
                </button>
              </td>
              <td className="w-[25%] h-[20%] p-[2px]" rowSpan={2}>
                <button
                  disabled={cpf.length < 11 || isLoading}
                  className={styles.numericButton}
                  onClick={handleConfirm}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin h-6 w-6" />
                  ) : (
                    "Enter"
                  )}
                </button>
              </td>
            </tr>
            <tr className="h-[20%]">
              <td className="w-[25%] h-[20%] p-[2px]" colSpan={2}>
                <button
                  className={styles.numericButton}
                  onClick={() => handleButtonClick(0)}
                >
                  0
                </button>
              </td>
              <td className="w-[25%] h-[20%] p-[2px]">
                <button disabled className={styles.numericButton}>
                  ,
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
