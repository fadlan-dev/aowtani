import {
  ICommunity,
  IDestination,
  ILocalGuide,
  IPartner,
  IProduct,
} from '@/types';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const numberFormat = (number: number | string) =>
  new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
    +number
  );

export function calculateItemsPerPage(
  totalItems: number,
  itemsPerPage: number
) {
  // Ensure that totalItems and itemsPerPage are both positive integers
  if (
    !Number.isInteger(totalItems) ||
    !Number.isInteger(itemsPerPage) ||
    totalItems <= 0 ||
    itemsPerPage <= 0
  ) {
    // throw new Error(
    //   'Both totalItems and itemsPerPage must be positive integers.'
    // );
    return 0;
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return totalPages;
}

export function getItemsPerPage<T>(
  arr: T[],
  currentPage: number,
  itemsPerPage: number
) {
  const startIndex = (currentPage - 1) * itemsPerPage || 6;
  const endIndex = startIndex + itemsPerPage || 6;
  return arr.slice(startIndex, endIndex);
}
