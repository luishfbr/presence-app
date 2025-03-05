"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deletePresenceList } from "@/app/_actions/server";
import { Loader2 } from "lucide-react";

interface DeletePresenceListProps {
  fetchLenght: () => void;
  lengthPresenceList: number;
}

export function DeletePresenceList({
  fetchLenght,
  lengthPresenceList,
}: DeletePresenceListProps) {
  const [loadingPresenceList, setLoadingPresenceList] = React.useState(false);

  const handleDeletePresenceList = async () => {
    try {
      setLoadingPresenceList(true);
      await deletePresenceList();
      fetchLenght();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPresenceList(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={lengthPresenceList === 0}
          variant={"secondary"}
          className="w-full"
        >
          {!loadingPresenceList ? (
            `Deletar lista de presença, ${lengthPresenceList} pessoa(s) atualmente registrada(s)`
          ) : (
            <Loader2 className="animate-spin h-6 w-6" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Isso apagará todos os registros de presença. Caso queira excluir
            apenas um registro, acesse a lista de presença.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeletePresenceList}>
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
