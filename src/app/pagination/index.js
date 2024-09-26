import { debounce } from 'lodash'; // Убедитесь, что lodash установлен
import React, { useCallback, useState } from 'react';
import './style.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [loading, setLoading] = useState(false);
  const pageNumbers = generatePageNumbers();

  const handlePageChange = useCallback(
    debounce(async (page) => {
      if (loading || currentPage === page) return;

      setLoading(true);
      try {
        await onPageChange(page);
      } catch (error) {
        console.error("Error changing page:", error);
      } finally {
        setLoading(false);
      }
    }, 200), // Дебаунс на 200 мс
    [loading, currentPage]
  );

  function generatePageNumbers() {
    const pageNumbers = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const start = currentPage <= 3 ? 1 : currentPage - 1;
      const end = currentPage >= totalPages - 2 ? totalPages : currentPage + 1;

      if (currentPage <= 2) {
        pageNumbers.push(1, 2, 3, '...', totalPages);
      } else if (currentPage === 3) {
        pageNumbers.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, '...', start, currentPage, end, '...', totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          disabled={loading || currentPage === page || page === '...'}
          className={currentPage === page ? 'active' : ''}
        >
          {page}
        </button>
      ))}
      {loading && <span className="loading">Loading...</span>}
    </div>
  );
};

export default Pagination;