type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination(props: PaginationProps) {
  const { currentPage, totalPages, onPageChange } = props;

  return (
    <div className="flex justify-center">
      <div className="join">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <input
            key={page}
            className={`join-item btn btn-square ${page === currentPage ? "btn-active" : ""}`}
            type="radio"
            name="pagination"
            aria-label={`${page}`}
            checked={page === currentPage}
            onChange={() => onPageChange(page)}
          />
        ))}
      </div>
    </div>
  );
}
