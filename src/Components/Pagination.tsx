
import React from 'react';


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {


  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    // Always show first page
    pages.push(1);

    // Calculate range around current page
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    // Adjust if at the beginning
    if (currentPage <= 3) {
      end = Math.min(totalPages - 1, 4);
    }

    // Adjust if at the end
    if (currentPage >= totalPages - 2) {
      start = Math.max(2, totalPages - 3);
    }

    // Add ellipsis before range if needed
    if (start > 2) {
      pages.push('...');
    }

    // Add range
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    // Add ellipsis after range if needed
    if (end < totalPages - 1) {
      pages.push('...');
    }

    // Always show last page if pages > 1
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 mt-12 mb-8">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          currentPage === 1
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`}
      >
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="rtl:rotate-180"
        >
            <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {pageNumbers.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-3 py-2 text-gray-400">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${
                currentPage === page
                  ? "bg-gray-900 text-white shadow-md scale-105"
                  : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          currentPage === totalPages
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`}
      >
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="rtl:rotate-180"
        >
            <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
