import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  paginationValues,
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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
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
  centerHeaders?: boolean;
  setPreviousPage?: () => void;
  setNextPage?: () => void;
  setPage?: (page: number) => void;
  setLimit?: (limit: number) => void;
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
  centerHeaders = false,
  setPreviousPage = noopFunction,
  setNextPage = noopFunction,
  setPage = noopFunction,
  setLimit = noopFunction,
}: CustomTableProps<T>) => {
  const { t } = useTranslation();

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
                  colSpan={header.colSpan}
                  className={cn(
                    'last:text-right',
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (header.column.columnDef.meta as any)?.isSortable && 'pl-0',
                    header.colSpan > 1 &&
                      'border-b-0 text-center last:text-center',
                    centerHeaders && 'text-center last:text-center',
                  )}
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
                  <TableHead
                    key={header.id}
                    className={'[&>div]:!text-left'}
                  >
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
        <div className="flex w-full justify-between items-center mt-4">
          <div className="flex items-center">
            {t('page_size')}
            <Select
              value={limit.toString()}
              onValueChange={(value) => setLimit(Number(value))}
            >
              <SelectTrigger
                size="sm"
                className="ml-2"
              >
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.values(paginationValues).map((limit) => (
                    <SelectItem
                      key={limit}
                      value={limit.toString()}
                    >
                      {limit}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Pagination className="flex m-0 w-min">
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
                      i + 1 === currentPage &&
                        'font-bold bg-gray-200 dark:bg-gray-700',
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
        </div>
      )}
    </>
  );
};
