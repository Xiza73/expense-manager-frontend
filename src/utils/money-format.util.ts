import { Currency } from '@/domain/currency.enum';

export type Separator = ',' | '.';

export type PatterOptions = {
  lenght?: number;
  separator?: Separator;
  prefix?: Currency;
};

export const getNumberSymbol = (num: number) => {
  return num < 0 ? '-' : '';
};

export const moneyFormat = (
  value: string,
  currency: Currency,
  maxLength: number = 5,
) => {
  value = value.replace(/[^0-9.]/g, '');
  value = value.replace(/^\./g, '');
  value = value.replace(/\.{2,}/g, '.');
  value = value.replace(/\..*\./g, '.');
  if (value.length > 1 && value[1] !== '.') value = value.replace(/^0+/g, '');
  value = value.replace(/\.\d{3,}/, '.' + value.split('.')[1]?.slice(0, 2));
  // value = value.replace(/\d{8,}/, value.substring(0, 7));
  if (value.length > maxLength && value[maxLength] !== '.')
    value = value.slice(0, maxLength);
  value = value === '' ? '0' : value;

  return `${currency} ${value}`;
};

export function patternMoney(
  value: string,
  { lenght = 10, separator = ',', prefix }: PatterOptions,
) {
  const dot = separator === ',' ? '.' : ',';
  // const maxLength = lenght + Math.ceil(lenght / 3) - 1;
  const maxLength = lenght;

  value = value
    .replace(new RegExp(`[^0-9${dot}]`, 'g'), '') // Remove all non-numeric characters
    .replace(new RegExp(`\\${dot}{2,}`, 'g'), dot) // Replace multiple decimal points with a single decimal point
    .replace(new RegExp(`\\${dot}.*\\${dot}`, 'g'), dot); // Replace trailing decimal point with a single decimal point
  // .replace(/\B(?=(\d{3})+(?!\d))/g, separator!); // Insert commas every 3 digits
  value = value.replace(
    new RegExp(`\\${dot}\\d{3,}`, ''),
    dot + value.split(dot)[1]?.slice(0, 2),
  ); // Truncate trailing decimal to 2 digits
  if (value.length > 1 && value[1] !== dot) value = value.replace(/^0+/g, ''); // Remove leading zeros
  const onlyIntegerPart = value.split(dot)[0];
  if (onlyIntegerPart.length > maxLength) value = value.slice(0, maxLength); // Truncate to max length
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, separator!); // Insert commas every 3 digits
  // value = value === '' ? '0' : value; // Ensure value is not empty

  return prefix ? `${prefix} ${value}` : value;
}

export function moneyToNumber(
  money: string,
  separator: Separator = ',',
): number {
  try {
    money = money.replace(/[^0-9,.]/g, '');
    if (separator === '.') {
      money = money.replace(/\./g, '').replace(/,/g, '.');
    } else {
      money = money.replace(/,/g, '');
    }

    return parseFloat(money);
  } catch (_) {
    return 0;
  }
}

export const handleMoneyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement;

  target.value = patternMoney(target.value, {
    lenght: 5,
    separator: ',',
  });
};
