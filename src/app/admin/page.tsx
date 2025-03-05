"use client";

import { File, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import {
  handleDownloadConvidados,
  handleDownloadCooperados,
  handleDownloadSocioCooperados,
} from "@/lib/utils";
import { InsertCooperados } from "./_components/insert-cooperados";
import { InsertConvidados } from "./_components/insert-convidados";
import { InsertSocios } from "./_components/insert-socios";
import {
  deleteAllCooperados,
  deleteAllConvidados,
  deleteAllSocios,
  getLengths,
  getLenghtPresenceList,
} from "../_actions/server";
import { useRouter } from "next/navigation";
import { PresenceList } from "./_components/presence-list";
import { DeletePresenceList } from "./_components/delete-presencelist";

export default function Page() {
  const router = useRouter();
  const [loadingCooperados, setLoadingCooperados] = React.useState(false);
  const [loadingConvidados, setLoadingConvidados] = React.useState(false);
  const [loadingSocios, setLoadingSocios] = React.useState(false);

  const [lengthCooperados, setLengthCooperados] = React.useState(0);
  const [lengthConvidados, setLengthConvidados] = React.useState(0);
  const [lengthSocios, setLengthSocios] = React.useState(0);
  const [lengthPresenceList, setlengthPresenceList] = React.useState(0);

  const handleDeleteCooperados = async () => {
    try {
      setLoadingCooperados(true);
      await deleteAllCooperados();
      fetchLenght();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCooperados(false);
    }
  };

  const handleDeleteConvidados = async () => {
    try {
      setLoadingConvidados(true);
      await deleteAllConvidados();
      fetchLenght();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingConvidados(false);
    }
  };

  const handleDeleteSocios = async () => {
    try {
      setLoadingSocios(true);
      await deleteAllSocios();
      fetchLenght();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSocios(false);
    }
  };

  const fetchLenght = React.useCallback(async () => {
    const res = await getLengths();
    const resp = await getLenghtPresenceList();
    setLengthCooperados(res?.cooperados || 0);
    setLengthConvidados(res?.convidados || 0);
    setLengthSocios(res?.socios || 0);
    setlengthPresenceList(resp?.presenceList || 0);
  }, []);

  React.useEffect(() => {
    fetchLenght();
  }, [fetchLenght]);

  return (
    <div className="flex flex-col gap-6 items-center justify-center h-screen mx-auto">
      <Card className="max-w-800px">
        <CardHeader>
          <CardTitle>Inserção de informações no banco de dados</CardTitle>
          <CardDescription>
            Utilize os campos abaixo para inserir as informações no banco de
            dados, fique de olho no padrão disponibilizado para que não haja
            erros.
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full grid grid-cols-3 gap-2">
          <span className="text-sm text-muted-foreground text-nowrap">
            Número de Cooperados: {lengthCooperados}
          </span>
          <span className="text-sm text-muted-foreground text-nowrap">
            Número de Convidados: {lengthConvidados}
          </span>
          <span className="text-sm text-muted-foreground text-nowrap">
            Número de Sócios: {lengthSocios}
          </span>
          <Button
            className="w-full"
            variant={"destructive"}
            onClick={handleDeleteCooperados}
          >
            {!loadingCooperados ? (
              "Deletar cooperados"
            ) : (
              <Loader2 className="animate-spin h-6 w-6" />
            )}
          </Button>
          <Button
            className="w-full"
            variant={"destructive"}
            onClick={handleDeleteConvidados}
          >
            {!loadingConvidados ? (
              "Deletar convidados"
            ) : (
              <Loader2 className="animate-spin h-6 w-6" />
            )}
          </Button>
          <Button
            className="w-full"
            variant={"destructive"}
            onClick={handleDeleteSocios}
          >
            {!loadingSocios ? (
              "Deletar sócios"
            ) : (
              <Loader2 className="animate-spin h-6 w-6" />
            )}
          </Button>
          <Button
            variant={"outline"}
            className="w-full"
            onClick={handleDownloadCooperados}
          >
            <File />
            Cooperados
          </Button>
          <Button
            variant={"outline"}
            className="w-full"
            onClick={handleDownloadConvidados}
          >
            <File />
            Convidados
          </Button>
          <Button
            variant={"outline"}
            className="w-full"
            onClick={handleDownloadSocioCooperados}
          >
            <File />
            Sócio de Cooperados
          </Button>
          <InsertCooperados onInsert={fetchLenght} />
          <InsertConvidados onInsert={fetchLenght} />
          <InsertSocios onInsert={fetchLenght} />
        </CardContent>
        <CardFooter className="w-full gap-2 items-center flex justify-center">
          <DeletePresenceList
            lengthPresenceList={lengthPresenceList}
            fetchLenght={fetchLenght}
          />
          <PresenceList />
        </CardFooter>
      </Card>
      <Button onClick={() => router.push("/")} variant={"link"}>
        Voltar para a página principal
      </Button>
    </div>
  );
}
