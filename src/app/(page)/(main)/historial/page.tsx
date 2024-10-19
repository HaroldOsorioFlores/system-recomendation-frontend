"use client";

import * as React from "react";
import { useState } from "react";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Search, X } from "lucide-react";

type ChatQuery = {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
};

const initialChatHistory: ChatQuery[] = [
  {
    id: "1",
    question: "¿Cuál es la capital de Francia?",
    answer: "La capital de Francia es París.",
    timestamp: new Date(2023, 5, 15, 10, 30),
  },
  {
    id: "2",
    question: "¿Cómo se hace una tortilla española?",
    answer:
      "Para hacer una tortilla española, necesitas huevos, patatas, cebolla, aceite de oliva y sal. Primero, corta y fríe las patatas y la cebolla. Luego, mezcla con los huevos batidos y cuaja la tortilla en una sartén.",
    timestamp: new Date(2023, 5, 16, 14, 45),
  },
  {
    id: "3",
    question: "¿Cuándo se inventó la imprenta?",
    answer:
      "La imprenta de tipos móviles fue inventada por Johannes Gutenberg alrededor del año 1440.",
    timestamp: new Date(2023, 5, 17, 9, 15),
  },
];

export default function HistoryPage() {
  const [chatHistory, setChatHistory] =
    useState<ChatQuery[]>(initialChatHistory);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHistory = chatHistory.filter(
    (query) =>
      query.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearSearch = () => {
    setSearchTerm("");
  };

  const deleteQuery = (id: string) => {
    setChatHistory((prevHistory) =>
      prevHistory.filter((query) => query.id !== id)
    );
  };

  return (
    <Card className="w-full min-w-[300px] max-w-7xl mx-auto">
      <CardHeader>
        <CardTitle>Historial</CardTitle>
        <CardDescription>Ver y buscar en tus consultas pasadas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar en el historial..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 h-5 w-5 p-0"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <ScrollArea className="h-[400px] rounded-md border p-4">
            {filteredHistory.map((query) => (
              <div key={query.id} className="mb-4 last:mb-0">
                <div className="flex items-start space-x-4">
                  <Avatar className="flex-shrink-0">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 flex-grow min-w-0">
                    <p className="text-sm font-medium leading-none">
                      {query.question}
                    </p>
                    <p className="text-sm text-muted-foreground break-words">
                      {query.answer}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(query.timestamp, "PPpp")}
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex justify-end">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => deleteQuery(query.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          Mostrando {filteredHistory.length} de {chatHistory.length} consultas
        </p>
      </CardFooter>
    </Card>
  );
}
