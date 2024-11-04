import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function RecomendacionPagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("pageHistory")) || 1;
  const size = Number(searchParams.get("sizeHistory")) || 10;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("pageHistory", newPage.toString());
    params.set("sizeHistory", size.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      handlePageChange(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      handlePageChange(page - 1);
    }
  };

  const getPageRange = () => {
    const rangeSize = 3;
    const start = Math.max(1, page - rangeSize);
    const end = Math.min(totalPages, page + rangeSize);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pageRange = getPageRange();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePreviousPage}
            className="cursor-pointer"
          />
        </PaginationItem>
        {pageRange.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              href="#"
              isActive={page === p}
              onClick={() => handlePageChange(p)}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        {pageRange[pageRange.length - 1] < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext onClick={handleNextPage} className="cursor-pointer" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
