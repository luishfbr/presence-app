import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleDownloadCooperados = () => {
  const fileUrl = "/Cooperado.csv";
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = "planilha_modelo_cooperado.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const handleDownloadConvidados = () => {
  const fileUrl = "/Convidado.csv";
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = "planilha_modelo_convidado.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const handleDownloadSocioCooperados = () => {
  const fileUrl = "/SocioCooperado.csv";
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = "planilha_modelo_sociocooperado.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};