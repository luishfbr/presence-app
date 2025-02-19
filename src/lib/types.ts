export interface Cooperado {
  name: string;
  cpfOrCnpj: string;
}

export interface Convidado {
  name: string;
  cpfOrCnpj: string;
}

export interface Socios {
  name: string;
  cpfOrCnpj: string;
  cooperadoId: string;
}

export interface Length {
  cooperados: number;
  convidados: number;
  socios: number;
}

export interface dataToPresence {
  name: string;
  cpfOrCnpj: string;
  cooperadoId: string | null;
}

export interface ResToVerify {
  id: number;
  name: string;
  cpf_or_cnpj: string;
  cooperadoId: string | null;
}

export interface FoundData {
  id: number;
  name: string;
  cpf_or_cnpj: string;
}