export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

const OrderHandler = {
  [Order.ASC]: Order.DESC,
  [Order.DESC]: undefined,
  NULL: Order.ASC,
};
type OrderHandlerKey = keyof typeof OrderHandler;

export const getNextOrder = (order: OrderHandlerKey): Order | undefined => {
  return OrderHandler[order];
};
