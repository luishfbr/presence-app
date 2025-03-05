import React from "react";
import styles from "@/app/style/presence.module.css";

interface ReturnButtonProps {
  onClick: () => void;
}

export default function ReturnButton({ onClick }: ReturnButtonProps) {
  return (
    <button className={styles.returnButton} onClick={onClick}>
      Voltar
    </button>
  );
}
