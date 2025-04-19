"use client";
import Pagination from "./Pagination";
import { useState } from "react";

export default function PaginationWrapper({ totalPages }: { totalPages: number }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
  );
}
