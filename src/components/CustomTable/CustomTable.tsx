import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { INITIAL_PAGINATOR } from '@/contants/initial-paginator.constant';
import { cn } from '@/lib/utils';
import { noopFunction } from '@/utils/noop-function.util';

import { Skeleton } from '../ui/skeleton';

export interface CustomTableProps<T> {
  data: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  previousEnabled?: boolean;
  nextEnabled?: boolean;
  totalPages: number;
  currentPage: number;
  isFetching?: boolean;
  showSkeleton?: boolean;
  limit?: number;
  withPagination?: boolean;
  withFooter?: boolean;
  setPreviousPage?: () => void;
  setNextPage?: () => void;
  setPage?: (page: number) => void;
}

export const CustomTable = <T extends object>({
  data,
  columns,
  previousEnabled = true,
  nextEnabled = true,
  totalPages,
  currentPage,
  isFetching = false,
  showSkeleton = true,
  limit = INITIAL_PAGINATOR.limit,
  withPagination = true,
  withFooter = true,
  setPreviousPage = noopFunction,
  setNextPage = noopFunction,
  setPage = noopFunction,
}: CustomTableProps<T>) => {
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const skeletonData = Array.from({ length: limit }, (_, i) => ({
    id: i + 1,
  }));

  return (
    <>
      <Table className="max-w-full mt-4">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="last:text-right"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {!isFetching &&
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="last:text-right"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {isFetching &&
            showSkeleton &&
            skeletonData.map((row) => (
              <TableRow key={row.id}>
                {columns.map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton className="w-full min-h-7 h-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
        {withFooter && (
          <TableFooter>
            {table.getFooterGroups().map((footerGroup) => (
              <TableRow key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableFooter>
        )}
      </Table>
      {withPagination && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={cn(
                  !previousEnabled && 'cursor-not-allowed',
                  previousEnabled && 'cursor-pointer',
                )}
                onClick={() => setPreviousPage()}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  className={cn(
                    i + 1 === currentPage && 'font-bold bg-gray-200',
                    i + 1 !== currentPage && 'cursor-pointer',
                  )}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                className={cn(
                  !nextEnabled && 'cursor-not-allowed',
                  nextEnabled && 'cursor-pointer',
                )}
                onClick={() => setNextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};
