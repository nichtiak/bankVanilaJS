export function extractErrorMessage(ErrorData) {
  return typeof ErrorData.message === 'object'
    ? ErrorData.message[0]
    : ErrorData.message
}