"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { PresenceListType } from "@/lib/types";
import { deleteSelectedPresence, getPresenceList } from "@/app/_actions/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Papa from "papaparse";

export function PresenceList() {
  const [presenceList, setPresenceList] = useState<PresenceListType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPresenceList = async () => {
    try {
      const res = await getPresenceList();
      setPresenceList(res?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePresence = async (cpf: string) => {
    try {
      const res = await deleteSelectedPresence(cpf);
      if (res?.status === 200) {
        fetchPresenceList();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(
      presenceList.map(({ name, cpf_or_cnpj, type }) => ({
        name,
        cpf_or_cnpj,
        type,
      }))
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "lista_presenca.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredList = presenceList.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.cpf_or_cnpj.includes(searchTerm)
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={fetchPresenceList} className="w-full">
          Acessar lista de presença
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[85vw]">
        <DialogHeader>
          <DialogTitle>Lista de Presença</DialogTitle>
          <DialogDescription>
            <Input
              placeholder="Pesquisar pelo Nome/CPF"
              type="text"
              className="max-w-[40vw]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[40vh] max-h-[40vh]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Nome</TableHead>
                <TableHead className="text-center">CPF</TableHead>
                <TableHead className="text-center">Tipo</TableHead>
                <TableHead className="text-center">Excluir</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredList.length !== 0 ? (
                filteredList.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{item.name}</TableCell>
                    <TableCell className="text-center">
                      {item.cpf_or_cnpj}
                    </TableCell>
                    <TableCell className="text-center">{item.type}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        onClick={() => deletePresence(item.cpf_or_cnpj)}
                        variant="destructive"
                      >
                        <Trash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground"
                  >
                    Nenhum dado encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={exportToCSV} type="button">
            Gerar Planilha
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
