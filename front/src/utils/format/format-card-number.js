/**
 * Formats a credit card number string by adding dashes every four digits.
 *
 * @param {string} cardNumber - The credit card number string to format.
 * @returns {string} The formatted credit card number string with dashes.
 */
export function formatCardNumberWithDashes(cardNumber) {
  return cardNumber.replace(/(\d{4})(?=\d)/g, '$1-')
}


/**
 * Форматирует номер кредитной карты в формат **** **** **** ****
 *
 * @param {string} cardNumber - Номер кредитной карты, состоящий из 16 цифр без сепараторов.
 * @returns {string} Форматированный номер кредитной карты.
 */
// Она затем удаляет все пробелы из номера карты и разбивает его на группы из четырёх цифр с помощью регулярного выражения /.{1,4}/g. Затем функция объединяет эти группы в одну строку с пробелами между ними, используя метод join().
export function formatCardNumber(cardNumber) {
  const formattedNumber = cardNumber.replace(/\s/g, '').match(/.{1,4}/g)
  return formattedNumber ? formattedNumber.join(' ') : ''
}