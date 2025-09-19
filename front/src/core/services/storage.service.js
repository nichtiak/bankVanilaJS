/**
 * StorageService - это класс, который предоставляет интерфейс для работы с LocalStorage
 * более удобным и структурированным способом.
 */
export class StorageService {

  
  /**
   * Получает item из LocalStorage предоставленным ключом.
   * 
   * @param {string} key - Ключ элемента, который должен быть извлечен.
   * @returns {any|null} Значение элемента, или NULL, если элемент не существует.
   */
  getItem(key) {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }


  /**
   * Сохраняет элемент в LocalStorage с предоставленным ключом и значением. 
   *
   * @param {string} key - Ключ, под которым будет храниться значение.
   * @param {any} value - Значение, которое нужно хранить.Он будет преобразован в строку JSON.
   * @returns {void}
   */
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }


  /**
   * Удаляет item из LocalStorage с помощью предоставленного ключа.
   *
   * @param {string} key - Ключ элемента для удаления.
   * @returns {void}
   */
  removeItem(key) {
    localStorage.removeItem(key)
  }


  /**
   * Очищает все данные из LocalStorage.
   */
  clear() {
    localStorage.clear()
  }
}