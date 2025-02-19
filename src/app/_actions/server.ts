"use server";

import type { Convidado, Cooperado, dataToPresence, Socios } from "@/lib/types";
import { prisma } from "@/services/prisma";

export const insertCooperados = async (cooperados: Cooperado[]) => {
  try {
    const data = cooperados.map((cooperado) => ({
      name: cooperado.name,
      cpf_or_cnpj: cooperado.cpfOrCnpj,
    }));

    await prisma.cooperado.createMany({
      data,
    });

    return { status: 200 };
  } catch (error) {
    console.error(error)
  }
}

export const deleteAllCooperados = async () => {
  try {
    await prisma.cooperado.deleteMany();
    return { status: 200 };
  } catch (error) {
    console.error(error)
  }
}

export const insertConvidados = async (convidados: Convidado[]) => {
  try {
    const data = convidados.map((convidado) => ({
      name: convidado.name,
      cpf_or_cnpj: convidado.cpfOrCnpj,
    }));

    await prisma.convidado.createMany({
      data,
    });

    return { status: 200 };
  } catch (error) {
    console.error(error)
  }
}

export const deleteAllConvidados = async () => {
  try {
    await prisma.convidado.deleteMany();
    return { status: 200 };
  } catch (error) {
    console.error(error)
  }
}

export const insertSocios = async (socios: Socios[]) => {
  try {
    const data = socios.map((socios) => ({
      name: socios.name,
      cpf_or_cnpj: socios.cpfOrCnpj,
      cooperadoId: socios.cooperadoId
    }));

    await prisma.socioCooperado.createMany({
      data,
    });

    return { status: 200 };
  } catch (error) {
    console.error(error)
  }
}

export const deleteAllSocios = async () => {
  try {
    await prisma.socioCooperado.deleteMany();
    return { status: 200 };
  } catch (error) {
    console.error(error)
  }
}

export const deletePresenceList = async () => {
  try {
    await prisma.listaDePresenca.deleteMany();
  } catch (error) {
    console.error(error)
  }
}

export const getLengths = async () => {
  try {
    const cooperados = await prisma.cooperado.count();
    const convidados = await prisma.convidado.count();
    const socios = await prisma.socioCooperado.count();

    return { cooperados, convidados, socios };
  } catch (error) {
    console.error(error)
  }
}

export const getLenghtPresenceList = async () => {
  try {
    const presenceList = await prisma.listaDePresenca.count();
    return { presenceList };
  } catch (error) {
    console.error(error)
  }
}

export const verifyIfExists = async (cpfOrCnpj: string) => {
  try {
    const cooperado = await prisma.cooperado.findUnique({
      where: {
        cpf_or_cnpj: cpfOrCnpj as string
      }
    });

    if (cooperado) {
      const verifyPresenceList = await prisma.listaDePresenca.findUnique({
        where: {
          cpf_or_cnpj: cooperado.cpf_or_cnpj as string
        }
      })

      if (!verifyPresenceList) {
        return { status: 200, type: "Cooperado", data: cooperado };
      }

      return { status: 402, type: "Cooperado", data: cooperado, message: "Cooperado com presença já registrada!" };
    }

    const convidado = await prisma.convidado.findUnique({
      where: {
        cpf_or_cnpj: cpfOrCnpj as string
      }
    });

    if (convidado) {
      const verifyPresenceList = await prisma.listaDePresenca.findUnique({
        where: {
          cpf_or_cnpj: convidado.cpf_or_cnpj as string
        }
      })

      if (!verifyPresenceList) {
        return { status: 200, type: "Convidado", data: convidado };
      }

      return { status: 402, type: "Convidado", data: convidado, message: "Convidado com presença já registrada!" };
    }

    const socio = await prisma.socioCooperado.findUnique({
      where: {
        cpf_or_cnpj: cpfOrCnpj as string
      }
    });

    if (socio) {
      const verifyPresenceList = await prisma.listaDePresenca.findUnique({
        where: {
          cpf_or_cnpj: socio.cpf_or_cnpj as string
        }
      })

      if (!verifyPresenceList) {
        return { status: 200, type: "Sócio", data: socio };
      }

      return { status: 402, type: "Sócio", data: socio, message: "Sócio com presença já registrada!" };
    }

    return { status: 404, message: "CPF/CNPJ não encontrado" };

  } catch (error) {
    console.error(error)
  }
}

export const registryPresence = async (data: dataToPresence) => {
  try {
    const res = await prisma.listaDePresenca.create({
      data: {
        name: data.name,
        cpf_or_cnpj: data.cpfOrCnpj,
        cooperadoId: data.cooperadoId
      }
    })

    return { status: 200, data: res };
  } catch (error) {
    console.error(error)
  }
}