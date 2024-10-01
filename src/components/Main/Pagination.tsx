import React from 'react';
import styled from '@emotion/styled';

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
  const getPageNumbers = () => {
    const pageNumbers: number[] = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    if (startPage === 1) {
      for (let i = 1; i <= Math.min(5, totalPages); i++) {
        pageNumbers.push(i);
      }
    } else {
      for (let i = startPage; i <= endPage; i++) {
        if (i <= totalPages) {
          pageNumbers.push(i);
        }
      }
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <PaginationContainer>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </Button>

      {pageNumbers.map((page) => (
        <PageNumber
          key={page}
          active={currentPage === page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageNumber>
      ))}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </Button>
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  margin: 0 10px;
  font-size: 16px;

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const PageNumber = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  color: ${(props) => (props.active ? '#007bff' : '#000')};
  cursor: pointer;
  margin: 0 5px;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;
