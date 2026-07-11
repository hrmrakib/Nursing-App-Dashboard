interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function GlobalPagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Logic to calculate the range of visible pages (3 at a time)
  const groupSize = 3;
  const currentGroup = Math.ceil(currentPage / groupSize);
  const startPage = (currentGroup - 1) * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className='flex items-center justify-center gap-2 mt-8 select-none'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-4 py-2 rounded-lg border border-[#D2881B] text-[#D2881B] disabled:opacity-30 hover:bg-white/5 hover:text-[#df890a] transition-all text-sm font-medium cursor-pointer disabled:cursor-not-allowed'
      >
        Prev
      </button>

      <div className='flex gap-1.5'>
        {pages.map((pageNumber) => {
          const isActive = currentPage === pageNumber;
          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer border ${
                isActive
                  ? "bg-linear-to-r from-[#D2881B] to-[#d18e29] text-white border-[#ac7420] font-bold shadow-lg shadow-[#ac7420]/10 scale-105"
                  : "border-[#D2881B] text-[#D2881B] hover:border-[#df890a] hover:text-[#df890a]"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='px-4 py-2 rounded-lg border border-[#D2881B] text-[#D2881B] disabled:opacity-30 hover:bg-white/5 hover:text-[#df890a] transition-all text-sm font-medium cursor-pointer disabled:cursor-not-allowed'
      >
        Next
      </button>
    </div>
  );
}
