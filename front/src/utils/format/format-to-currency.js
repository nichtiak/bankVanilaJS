/**
 * Formats a number into a currency string in Russian Rubles (RUB).
 * Formats a number as a string with the specified currency symbol.
 *
 * @param {number} number - The number to format as currency.
 * @returns {string} The formatted currency string.
 */
export function formatToCurrency(number) {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'RUB',
    style: 'currency'
  }).format(number)
}