export interface PaginationProps {
  currentPage: number;
  total: number;
  pageChange: (page: number) => void;
}
