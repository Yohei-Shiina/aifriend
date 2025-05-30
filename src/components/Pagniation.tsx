import Link from "next/link";

import { ARTICLES_PAGE_PREFIX } from "@root/config/routes";

export default function Pagination({
  totalPageCount,
  selectedPage,
}: {
  totalPageCount: number;
  selectedPage: number;
}) {
  return (
    <div className="join flex justify-center">
      {Array.from({ length: totalPageCount }, (_, i) => i + 1).map((page) => (
        <Link key={page} href={`${ARTICLES_PAGE_PREFIX}/${page}`} prefetch={true}>
          <input
            key={page}
            className={`join-item btn btn-square ${page === selectedPage ? "btn-active" : ""}`}
            type="radio"
            name="pagination"
            aria-label={`${page}`}
            defaultChecked={page === selectedPage}
            readOnly
          />
        </Link>
      ))}
    </div>
  );
}
