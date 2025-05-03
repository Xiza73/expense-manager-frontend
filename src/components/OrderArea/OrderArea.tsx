import { ArrowDown, ArrowUp } from 'lucide-react';

import { GetTransactionsFieldOrder } from '@/app/transaction/domain/requests/get-transactions.request';
import { Order } from '@/domain/order.enum';

import ToggleArea from '../ToggleArea';

export interface OrderAreaProps {
  label: string;
  fieldOrder?: string;
  currentField: GetTransactionsFieldOrder;
  order?: Order;
  handleSearch: (value: GetTransactionsFieldOrder, order?: Order) => void;
}

export const OrderArea: React.FC<OrderAreaProps> = ({
  label,
  fieldOrder,
  currentField,
  order,
  handleSearch,
}) => {
  const isActive = fieldOrder === currentField;
  const handleClick = () => {
    handleSearch(currentField, order);
  };

  return (
    <ToggleArea
      isActive={isActive}
      onClick={handleClick}
    >
      {label}
      {order === Order.DESC && isActive && <ArrowDown className="w-5 h-5" />}
      {order === Order.ASC && isActive && <ArrowUp className="w-5 h-5" />}
    </ToggleArea>
  );
};
