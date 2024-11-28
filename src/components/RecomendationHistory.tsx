"use client";

import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
// import { Search, X } from "lucide-react";
import useRecomendationHistory from "@/hooks/useRecomendationHistory";
import useAuthStore from "@/store/auth.store";
import { categoryIMC, formaterDate } from "@/lib/utils";
import { RecomendationDialog } from "@/components/RecomendationDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { RecomendacionPagination } from "@/components/RecomendationPagination";
import { usePathname, useSearchParams } from "next/navigation";

export default function RecomendationHistory() {
  const { data, isPending, mutate } = useRecomendationHistory();
  const { token } = useAuthStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [initialTotalPages, setInitialTotalPages] = React.useState(1);

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const page = Number(params.get("pageHistory")) || 1;
    const size = Number(params.get("sizeHistory")) || 10;

    if (token) {
      mutate({ page, size, token });
    }
  }, [mutate, token, pathname, searchParams]);

  React.useEffect(() => {
    if (data) {
      setInitialTotalPages(Math.ceil(data.total / data.size));
    }
  }, [data]);

  const totalPages = React.useMemo(() => {
    return initialTotalPages;
  }, [initialTotalPages]);

  return (
    <Card className="w-full min-w-[300px] max-w-7xl mx-auto">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Historial</CardTitle>
          <p className="text-sm text-muted-foreground">
            {data?.total !== undefined && data?.total > 10 ? (
              <span>
                Mostrando {data?.size ?? 0} de {data?.total ?? 0} consultas
              </span>
            ) : (
              <span>Mostrando {data?.total ?? 0} consultas</span>
            )}
          </p>
        </div>
        {/* <CardDescription>Ver y buscar en tus consultas pasadas</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* <div className="relative">
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
          </div> */}
          <ScrollArea className="h-[600px] rounded-md border p-4">
            {isPending ? (
              <>
                {Array.from({ length: 10 }).map((_, index) => (
                  <div key={index} className="space-y-2 w-full">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                ))}
              </>
            ) : data?.items && data.items.length > 0 ? (
              <>
                {data?.items.map((query) => (
                  <div key={query.id} className="mb-4 last:mb-0">
                    <div className="flex items-start space-x-4">
                      <div className="space-y-1 flex-grow min-w-0">
                        <p className="text-sm font-medium leading-none">
                          Recomendacion Pasada #{query.id}
                        </p>
                        <p className="text-sm text-muted-foreground break-words">
                          IMC: {query.imc}
                        </p>
                        <p className="text-sm text-muted-foreground break-words">
                          Resultado: {categoryIMC(query.imc)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formaterDate(query.f_recomendacion)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end gap-4">
                      <RecomendationDialog data={query} />
                      {/* <Button variant="default" size="sm">
                        Eliminar
                      </Button> */}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-sm text-muted-foreground italic bg-muted/50 p-4 rounded-md">
                Todavia no solicitaste una recomendación...
              </p>
            )}
          </ScrollArea>
        </div>
      </CardContent>
      <CardFooter>
        {totalPages > 0 && <RecomendacionPagination totalPages={totalPages} />}
      </CardFooter>
    </Card>
  );
}
