import { SERVER_URL } from "@/config/url.config"
import { NotificationService } from "../services/notification.service"
import { StorageService } from "../services/storage.service"
import { extractErrorMessage } from "./extract-error-message"
import { ACCESS_TOKEN_KEY } from "@/constants/auth.constants"

/**
 * A-Query-это минималистичная библиотека для обработки запросов API.
 * Получить данные из API с предоставленными параметрами.
 *
 * @param {Object} options - Параметры конфигурации для запроса API.
 * @param {string} options.path - Путь конечной точки API.
 * @param {('GET'|'POST'|'PATCH'|'DELETE'|'PUT')} [options.method='GET'] - Метод HTTP для использования для запроса.
 * @param {Object} [options.body=null] - Запрос полезной нагрузки на отправку в качестве JSON.
 * @param {Object} [options.headers={}] - Дополнительные заголовки, чтобы включить с запросом.
 * @param {Function} [options.onSuccess=null] - Функция обратного вызова для успешного ответа.
 * @param {Function} [options.onError=null] - Функция обратного вызова для вызова в ответ на ошибку.
 * @returns {Promise<{isLoading: boolean, error: string|null, data: any|null}>} - Объект, содержащий состояние загрузки, ошибку и данные из ответа.
 */
export async function aQuery({
  path,
  body = null,
  headers = {},
  method = 'GET',
  onError = null,
  onSuccess = null
}) {
  let isLoading = true, error = null, data = null
  const url = `${SERVER_URL}/api${path}`


  const accessToken = new StorageService().getItem(ACCESS_TOKEN_KEY)

  const requestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  }

  if (accessToken) {
    requestOptions.headers.Authorization = `Bearer ${accessToken}`
  }

  if (body) {
    requestOptions.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(url, requestOptions)

    if (response.ok) {
      data = await response.json()
      if (onSuccess) {
        onSuccess(data)
      }
    } else {
      const errorData = await response.json()
      const errorMessage = extractErrorMessage(errorData)

      if (onError) {
        onError(errorMessage)
      }

      new NotificationService().show('error', errorMessage)

    }
  } catch (errorData) {
    const errorMessage = extractErrorMessage(errorData)

    if (onError) {
      onError(errorMessage)
    }
    new NotificationService().show('error', errorMessage)
  } finally {
    isLoading = false
  }

  return {isLoading, error, data}
}