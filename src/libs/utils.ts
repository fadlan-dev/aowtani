import { ModalSettings } from '@mantine/modals/lib/context';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import jwt, { JwtPayload } from 'jsonwebtoken';

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

export function isImageURL(str: string) {
  const redirectPattern = /\/rails\/active_storage\/blobs\/redirect\//;

  return redirectPattern.test(str);
}

export const MODALS_CONFIG: ModalSettings = {
  fullScreen: true,
  closeButtonProps: {
    radius: 'xl',
    variant: 'transparent',
  },
  styles: {
    header: {
      background: 'transparent',
      position: 'absolute',
      right: 16,
    },
    content: {
      background: 'transparent',
    },
    body: {
      padding: 0,
      background: 'rgb(1,1,1,0.5)',
    },
  },
};

export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwt.decode(token) as JwtPayload;

    if (!decoded || typeof decoded.exp === 'undefined') {
      // Token couldn't be decoded or doesn't have an expiration claim
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);

    return decoded.exp! < currentTime;
  } catch (error) {
    // An error occurred while decoding the token
    return false;
  }
}

export function isValidUrl(url: string): string {
  // Regular expression to match "http://" or "https://"
  var pattern = /^(http|https):\/\//;

  // Test if the URL starts with "http://" or "https://"
  return pattern.test(url) ? url : `http://${url}`;
}

export function facebookLink(value: string): string{
    const urlRegex = /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+)(?:\.[a-zA-Z]{2,})(?:\/[a-zA-Z0-9-._]*)*\/?$/
    return urlRegex.test(value) ? value : `https://web.facebook.com/search/top/?q=${value}`
}

export function getPartnerType(value: string): string{
  switch (value) {
    case 'Hotel':
      return 'ที่พัก'
    case 'Restaurant':
      return 'ที่พัก'
    case 'TourActivity':
      return 'ที่พัก'
    case 'Shop':
      return 'ที่พัก'
    default:
      return '';
  }
}
