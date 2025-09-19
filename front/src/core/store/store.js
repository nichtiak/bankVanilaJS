import { ACCESS_TOKEN_KEY, USER_STORAGE_KEY } from "@/constants/auth.constants"
import { StorageService } from "../services/storage.service"


/**
 * Магазин класс реализует шаблон Singleton, обеспечивая централизованное решение для хранения состояния..
 * Управлениет входом/выходом пользователя в систему и уведомление, наблюдение за любыми изменениями в состоянии.
 * Получает сохраненные пользовательские данные из хранилища, если таковые имеются.
 * 
 * @param {Object} initialState - Начальный объект состояния для магазина
 */
export class Store {
  constructor(initialState) {
    this.observers = []

    this.storageService = new StorageService()
    const savedUser = this.storageService.getItem(USER_STORAGE_KEY)

    const state = savedUser ? { user: savedUser } : initialState

    this.state = new Proxy(state, {
      set: (target, property, value) => {
        target[property] = value

        this.notify()
        return true
      }
    })
  }

  /**
   * Получаем экземпляр магазина в синглтоне
   * 
   * Возвращает экземпляр Singleton класса магазина.
   * Если экземпляр не существует, он создает новый с начальным состоянием, где пользователь null.
   *
   * @returns {Store} Экземпляр магазина в синглтоне.
   */
  static getInstance() {
    if (!Store.instance) {
      Store.instance = new Store({ user: null })
    }
    return Store.instance
  }


  /**
   * Добавить наблюдателя в список наблюдателей магазина.
   * @param {Function} observer - Добавляет функцию для набюлюдения.
   * @returns {void}
   */
  addObserver(observer) {
    this.observers.push(observer)
  }


  /**
   * Удаляет наблюдателя из списка наблюдателей магазина.
   *
   * @param {Object} observer - Объект наблюдателя для удаления.
   */
  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer)
  }


  /**
   * Уведомление от наблюдателей обо всех изменениях состояния.
   */
  notify() {
    for (const observer of this.observers) {
      observer.update()
    }
  }


  /**
   * Вход в пользователя и обновление службы состояния и хранения
   *
   * @param {Object} user - Объект пользователя для входа в систему.
   * @param {string} accessToken - Токен доступа, который должен храниться.
   */
  login(user, accessToken) {
    this.state.user = user
    this.storageService.setItem(USER_STORAGE_KEY, user)
    this.storageService.setItem(ACCESS_TOKEN_KEY, accessToken)
  }
  
  
  /**
   *Выполняет пользователя, очистив данные пользователя из состояния и удаляя
* Пользователь и токен доступа из хранилища.
   * 
   * Выход пользователя, обновление состояние и удаление пользователя из службы хранения
   */
  logout() {
    this.state.user = null
    this.storageService.removeItem(USER_STORAGE_KEY)
    this.storageService.removeItem(ACCESS_TOKEN_KEY)
  }


  /**
   * Обновление пользовательской карты
   * 
   * @param {Object} card - Объект карты 
   * @returns {void}
   */
  updateCard(card) {
    const oldUser = this.state.user
    const newUser = {...oldUser, card}
    this.state.user = newUser
    this.storageService.setItem(USER_STORAGE_KEY, newUser)
  }
}