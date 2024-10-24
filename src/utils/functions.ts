import {
  format,
  formatDistanceToNow,
  isToday,
  isValid,
  isYesterday,
} from 'date-fns';
import {capitalize} from 'lodash';

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

type LastModifiedOptions = {
  includeSeconds?: boolean;
  includeSuffix?: boolean;
  dateFormat?: string;
};

export const lastModifiedAt = (
  dateString: string,
  options: LastModifiedOptions = {},
): string => {
  const {
    includeSeconds = true,
    includeSuffix = true,
    dateFormat = "do MMM, yyyy 'at' HH:mm:ss",
  } = options;

  const date = new Date(dateString);

  if (!isValid(date)) {
    return 'Invalid date';
  }

  try {
    const fullDateString = format(date, dateFormat);

    if (isToday(date)) {
      const hoursAgo = formatDistanceToNow(date, {
        addSuffix: includeSuffix,
        includeSeconds,
      });
      return `${capitalize(hoursAgo)}. ${fullDateString}`;
    }

    if (isYesterday(date)) {
      return `Yesterday. ${fullDateString}`;
    }

    return fullDateString;
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'We encountered an error getting the time this item was last modified';
  }
};
