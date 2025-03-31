"use client";

import { useState } from "react";
import Papa from "papaparse";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { insertSocios } from "@/app/_actions/server";
import type { Socios } from "@/lib/types";

interface InsertProps {
  onInsert: () => void;
}

export function InsertSocios({ onInsert }: InsertProps) {
  const { toast } = useToast();
  const [data, setData] = useState<Socios[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleParseCSV = () => {
    if (!file) {
      alert("Selecione um arquivo CSV antes de processá-lo.");
      return;
    }

    const reader = new FileReader();
    reader.onload = ({ target }) => {
      if (!target?.result) return;
      Papa.parse(target.result as string, {
        header: true, // Mantém os cabeçalhos como chaves no objeto
        skipEmptyLines: true,
        complete: (result) => {
          setData(result.data as Socios[]);
        },
      });
    };
    reader.readAsText(file);
  };

  const insertSociosFun = async () => {
    try {
      setLoading(true);
      const res = await insertSocios(data);
      if (res?.status === 200) {
        toast({
          title: "Sócios inseridos com sucesso",
          description:
            "Os sócios foram inseridos com sucesso no banco de dados.",
        });
        setData([]);
        onInsert();
      } else {
        toast({
          title: "Erro ao inserir sócios",
          description: "Ocorreu um erro ao inserir os sócios, tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao inserir sócios",
        description: "Ocorreu um erro ao inserir os sócios, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled className="w-full">
          Inserir Sócios
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Insira a planilha modelo</DialogTitle>
          <DialogDescription>
            Aceitamos apenas .csv, coloque os dados no padrão disponibilizado
            para download.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row gap-2 w-full">
            <Input
              className="w-full"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
            />
            <Button
              className="w-full"
              onClick={handleParseCSV}
              disabled={!file}
            >
              Verificar
            </Button>
          </div>
          <span className="text-sm text-muted-foreground">
            Os dados inseridos aparecerão abaixo.
          </span>
          {data.length > 0 ? (
            <span className="text-muted-foreground text-sm">
              {data.length} cooperados
            </span>
          ) : null}
          <div className="rounded-md border border-border p-2 max-h-40 overflow-auto">
            <ScrollArea>
              {data.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>CPF ou CNPJ</TableHead>
                      <TableHead>ID do Cooperado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {Object.values(row).map((cell, cellIndex) => (
                          <TableCell key={cellIndex}>{String(cell)}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-center text-muted-foreground text-sm">
                  Nenhum dado carregado
                </p>
              )}
            </ScrollArea>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={insertSociosFun}
            disabled={data.length === 0}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Enviar ao banco de dados"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
