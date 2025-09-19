class FormService {
  /**
   * Извлекает значения входных элементов в элементе формы
   *
   * @param {HTMLElement} formElement - Элемент формы, содержащий входные элементы.
   * @returns {Object} Объект, содержащий имя элемента ввода в качестве ключа, и его значение в качестве значения.
   */
  getFormValues(formElement) {
    const inputs = formElement.querySelectorAll('input')
    const values = {}

    for (const input of inputs) {
      values[input.name] = input.value
    }
    return values
  }
}

export default new FormService()