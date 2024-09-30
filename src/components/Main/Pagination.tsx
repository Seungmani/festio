import React from 'react';
import styled from '@emotion/styled';

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
    const startPage = Math.max(1, currentPage - 2); // 현재 페이지를 기준으로 시작 페이지
    const endPage = Math.min(totalPages, startPage + 4); // 끝 페이지

    // 시작 페이지가 1이면 끝 페이지는 최소 5로 설정
    if (startPage === 1) {
      for (let i = 1; i <= Math.min(5, totalPages); i++) {
        pageNumbers.push(i);
      }
    } else {
      // 페이지 번호 추가
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

      {/* 페이지 번호 표시 */}
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
