import { useState } from 'react';

import { INITIAL_PAGINATOR } from '@/contants/initial-paginator.constant';

export interface PaginationProps {
  initialPage: number;
  initialPageSize: number;
}

export interface PaginationState {
  currentPage: number;
  nextEnabled: boolean;
  previousEnabled: boolean;
  pageSize: number;
  setNextPage: () => void;
  setPreviousPage: () => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setTotalPages: (totalPages: number) => void;
  totalPages: number;
}

export const usePagination = (
  props: PaginationProps = {
    initialPage: INITIAL_PAGINATOR.page,
    initialPageSize: INITIAL_PAGINATOR.limit,
  },
): PaginationState => {
  const { initialPage, initialPageSize } = props;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalPages, setTotalPages] = useState(1);

  const setNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const setPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    nextEnabled: currentPage < totalPages,
    previousEnabled: currentPage > 1,
    pageSize,
    setNextPage,
    setPreviousPage,
    setPage,
    setPageSize,
    setTotalPages,
    totalPages,
  };
};
