import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const numberFormat = (number: number | string) =>
  new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
    +number
  );
