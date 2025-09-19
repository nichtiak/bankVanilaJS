import { $R } from "../rquery/rquery.lib"
import styles from '@/components/layout/notification/notification.module.scss'

/**
 * Уведомления - утилитарный класс для обработки отображения уведомлений
 * Его можно использовать для отображения сообщений с различными типами (успех, ошибка) и управления тайм-аутом уведомлений.
 */
export class NotificationService {
  #timeout

  constructor() {
    this.#timeout = null
  }

  #setTimeout(callback, duration) {
    if(this.#timeout) {
      clearTimeout(this.#timeout)
    }
    this.#timeout = setTimeout(callback, duration)
  }


  /**
   * Отображает уведомление указанного типа с данным сообщением.
   * Уведомление автоматически скрывается после указанной продолжительности
   *
   * @param {string} message - Сообщение, которое будет отображаться в уведомлении.
   * @param {('success'|'error')} type - Тип уведомления, принимает только «успех» или «ошибка».
   */
  show(type, message) {
    if (!['success', 'error'].includes(type)) {
      throw new Error(
        'Invalid notification type. Allowed types are "success" and "error".'
      )
    }

    const classNames = {
      success: styles.success,
      error: styles.error
    }

    const notificationElement = $R('#notification')
    const className = classNames[type]

    notificationElement.text(message).addClass(className)

    this.#setTimeout(()=> {
      notificationElement.removeClass(className)
    }, 3000)
  }
}

window.notification = new NotificationService()