import React from "react";

interface PaginationProps {
   currentPage: number;
   totalPages: number;
   onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
   return (
      <div className="pagination">
         <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
            Назад
         </button>
         <span>Страница {currentPage} из {totalPages}</span>
         <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
            Вперед
         </button>
      </div>
   );
};

export default Pagination;