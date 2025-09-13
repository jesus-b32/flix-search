"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { generatePagination } from "@/lib/generatePagination";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * This client component is used to display pagination links for the search results.
 * Used in the search results page and the discover pages.
 *
 * @param totalPages - The total number of pages in the search results
 * @param className - Optional className for the pagination component
 * @returns The pagination link component that displays the pagination links for the search results
 */
export default function PaginationComponent({
  totalPages,
  className,
}: {
  totalPages: number;
  className?: string;
}) {
  // lets you read the current URL's pathname.
  const pathname = usePathname();
  // lets you read the current URL's query string.
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const searchTerm = searchParams.get("search") ?? "";

  /**
   * Creates the URL for a specific page number.
   * Used to create the URL for a specific page number.
   * @param pageNumber - The page number to create the URL for
   * @returns The URL for the specified page number
   */
  const createPageURL = (pageNumber: number) => {
    //create a url friendly search params
    const params = new URLSearchParams(searchParams);
    if (searchTerm === "") {
      params.delete("search");
    } else {
      params.set("search", searchTerm);
    }
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? createPageURL(currentPage - 1) : "#"}
            className={currentPage === 1 ? "pointer-events-none" : ""}
          />
        </PaginationItem>
        {allPages.map((page) => {
          if (typeof page === "string") {
            return (
              <PaginationItem key={page}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          } else if (page === currentPage) {
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href={createPageURL(page)}
                  isActive
                  className="text-black"
                  size="sm"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          } else {
            return (
              <PaginationItem key={page}>
                <PaginationLink href={createPageURL(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          }
        })}
        <PaginationItem>
          <PaginationNext
            href={
              currentPage < totalPages ? createPageURL(currentPage + 1) : "#"
            }
            className={currentPage === totalPages ? "pointer-events-none" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
