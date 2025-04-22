import { Currency } from '@/domain/currency.enum';

export type Separator = ',' | '.';

export type PatterOptions = {
  lenght?: number;
  separator?: Separator;
  prefix?: Currency;
};

export const moneyFormat = (value: string, currency: Currency) => {
  const maxLength = 7;
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
  options: PatterOptions = {
    lenght: 10,
    separator: ',',
  },
) {
  const { lenght = 10, separator = ',', prefix } = options;
  const dot = separator === ',' ? '.' : ',';
  const maxLength = lenght! + Math.ceil(lenght! / 3) - 1;

  value = value
    .replace(new RegExp(`[^0-9${dot}]`, 'g'), '') // Remove all non-numeric characters
    .replace(new RegExp(`\\${dot}{2,}`, 'g'), dot) // Replace multiple decimal points with a single decimal point
    .replace(new RegExp(`\\${dot}.*\\${dot}`, 'g'), dot) // Replace trailing decimal point with a single decimal point
    .replace(/\B(?=(\d{3})+(?!\d))/g, separator!); // Insert commas every 3 digits
  value = value.replace(
    new RegExp(`\\${dot}\\d{3,}`, ''),
    dot + value.split(dot)[1]?.slice(0, 2),
  ); // Truncate trailing decimal to 2 digits
  if (value.length > 1 && value[1] !== dot) value = value.replace(/^0+/g, ''); // Remove leading zeros
  if (value.split(dot)[0].length > maxLength) value = value.slice(0, maxLength); // Truncate to max length
  value = value === '' ? '0' : value; // Ensure value is not empty

  return prefix ? `${prefix} ${value}` : value;
}

export function moneyToNumber(
  money: string,
  separator: Separator = ',',
): number {
  money = money.replace(/[^0-9,.]/g, '');
  if (separator === '.') {
    money = money.replace(/\./g, '').replace(/,/g, '.');
  } else {
    money = money.replace(/,/g, '');
  }
  return parseFloat(money);
}

export const handleMoneyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement;

  target.value = patternMoney(target.value, {
    lenght: 8,
    separator: ',',
  });
};
