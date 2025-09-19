import { aQuery } from "@/core/a-query/a-query.lib"
import { NotificationService } from "@/core/services/notification.service"
import { Store } from "@/core/store/store"

export class CardService {
  #BASE_URL = '/cards'

  constructor() {
    this.store = Store.getInstance().state

    this.notificationService = new NotificationService()
  }

  byUser(onSuccess) {
    return aQuery({
      path: `${this.#BASE_URL}/by-user`,
      onSuccess
    })
  }


  /**
   * Обновляет баланс пользователя с указанной суммой и типом.
   *
   * @param {number} amount - Сумма, которая должна быть добавлена ​​или снята из баланса пользователя.
   * @param {'top-up' | 'withdrawal'} type - Тип транзакции, либо «пополнение», либо «снятие».
   * @param {function} onSuccess - Функция обратного вызова, которая будет выполнена, когда обновление баланса будет успешным.
   * @returns {Promise} Объект обещания, который решает ответ от API.
   */
  updateBalance(amount, type, onSuccess) {
    return aQuery({
      path: `${this.#BASE_URL}/balance/${type}`,
      method: 'PATCH',
      body: {amount: +amount},
      onSuccess: () => {
        this.notificationService.show(
          'success',
          'Balance successfully changed!'
        )
        onSuccess()
      }
    })
  }


  /**
   * Перевод денег между двумя номерами карт
   *
   * @param {Object} params - Сведения о передаче.
   * @param {number} body.amount - Сумма, которая должна быть передана.
   * @param {string} body.toCardNumber - Номер карты получателя.
   * @param {Function} onSuccess - Функция обратного вызова, выполняемая при успешной передаче.
   * @returns {Promise} Обещание, которое разрешается с ответом.
   */
  transfer({amount, toCardNumber}, onSuccess) {
    return aQuery({
      path: `${this.#BASE_URL}/transfer-money`,
      method: 'PATCH',
      body: {
        amount: +amount, 
        formCardNumber: this.store.user.card.number,
        toCardNumber
      },
      onSuccess: () => {
        this.notificationService.show(
          'success',
          'Transfer successfully completed!'
        )
        onSuccess()
      }
    })
  }
}