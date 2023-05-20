export const numberFormat = (number: number | string) =>
  new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
    +number
  );
