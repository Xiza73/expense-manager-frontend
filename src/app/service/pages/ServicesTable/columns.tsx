import { createColumnHelper } from '@tanstack/react-table';
import { Edit, Trash } from 'lucide-react';

import { TransactionService } from '@/app/transaction/domain/transaction-service.interface';

const columnHelper = createColumnHelper<TransactionService>();

interface ColumnProps {
  t: (key: string) => string;
  goToEdit: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

export const getColumns = ({ t, goToEdit, onDelete }: ColumnProps) => {
  return [
    columnHelper.accessor('name', {
      header: t('name'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('id', {
      header: t('actions'),
      cell: (info) => {
        const id = info.getValue().toString();
        const name = info.row.original.name;
        const userId = info.row.original.userId;

        if (!userId) return null;

        return (
          <div className="w-full flex justify-end gap-2 items-center">
            <Edit
              onClick={() => goToEdit(id, name)}
              className="cursor-pointer size-6"
            />
            <Trash
              onClick={() => onDelete(id)}
              className="cursor-pointer size-6"
            />
          </div>
        );
      },
    }),
  ];
};
