"use client";
import { useState } from "react";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="join flex justify-center">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <input
          key={page}
          className={`join-item btn btn-square ${page === currentPage ? "btn-active" : ""}`}
          type="radio"
          name="pagination"
          aria-label={`${page}`}
          checked={page === currentPage}
          onChange={() => handlePageChange(page)}
        />
      ))}
    </div>
  );
}
