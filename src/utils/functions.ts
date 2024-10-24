/**
 * Calculates the total credit or debit amount of transactions within a date range.
 *
 * @param amount The amount to be formatted
 * @param hidden The boolean for what object is returned. True will return a masked naira value
 * @param currency The currency value to be returned
 * @returns An object containing currency, naira, and kobo. This applies to other currencies as well.
 */
export const formatAmount = (
  amount: string | number,
  currency: string = 'NGN',
) => {
  const formatter = new Intl.NumberFormat('en-NG', {
    currency,
    minimumFractionDigits: 2,
    style: 'currency',
  });

  const roundedAmount = parseFloat(Number(amount).toFixed(2));

  if (!isNaN(roundedAmount) && roundedAmount !== 0) {
    const fullAmount = formatter.format(roundedAmount / 100);
    const parts = fullAmount.split('.');
    const currencySymbol = parts[0][0]; // "₦"
    const wholeNumberPart = parts[0].slice(1); // "1,234"
    const fractionalPart = parts[1]; // "56"

    return `${currencySymbol}${wholeNumberPart}.${fractionalPart}`;
  }
  return '₦0.00';
};
