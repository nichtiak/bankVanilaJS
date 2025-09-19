import { formatCardNumberWithDashes } from "@/utils/format/format-card-number";

/** 
 * Класс для работы с DOM элементами 
 */
class RQuery {
    /**
     * Создание нового Rquery instanse
     * @param {string|HTMLElement} selector принимает либо строку либо HTML элемент
     */

    constructor(selector) {
      
      if (typeof selector === "string") {
        console.log(selector);
        console.log(document.getElementById('content'))
        this.element = document.querySelector(selector)
        console.log(this.element);

            if (!this.element) {
                throw new Error (`Element ${selector} not found!`)
            }
        } else if (selector instanceof HTMLElement) {
            this.element = selector
            console.log(this.element);
            
        } else {
            throw new Error('Invalid selector type')
        }
        console.log(selector);
        
    }

    /**
     * Find the first element that matches the specified selector within the selected element
     * @param {string} selector - css selector string to search within the selected element
     * @returns {RQuery} A new RQuery instance for the found element
     */
    find(selector) {
        console.log(selector);
        
        const element = new RQuery(this.element.querySelector(selector))

        if(element) {
            return element
        } else {
            throw new Error(`Element ${selector} not found!`)
        }
    }


    /**
     * Находит все элементы, соответствующие данному селектору в выбранном элементе.
     *
     * @param {string} selector - Строка селектора CSS для поиска в выбранном элементе.
     * @returns {RQuery[]} Множество новых экземпляров RQQUERY для найденных элементов.
     */
    findAll(selector) {
      const elements = this.element.querySelectorAll(selector)
      return Array.from(elements).map(element => new RQuery(element))
    }


    /**
     * Получить или установить внутренний HTML-код выбранного элемента
     * @param {string} [htmlContent] - Необязательное содержимое HTML для установки. Если оно не указано, будет возвращен текущий внутренний HTML.
     * @returns {RQuery|string} Текущий экземпляр Rquery для цепочки при установке HTML-контента или текущий внутренний HTML при получении
     */
    html(htmlContent) {
        if (typeof htmlContent === undefined) {
            return this.element.innerHTML
        } else {
            this.element.innerHTML = htmlContent
            return this
        }
    }


    /**
     * Получить или установить внутренний текстовый контент выбранного элемента
     * @param {string} [htmlContent] - Необязательное текстовое содержимое для установки. Если оно не указано, будет возвращен текущий внутренний HTML.
     * @returns {RQuery|string} Текущий экземпляр Rquery для цепочки при установке HTML-контента или текущий внутренний HTML при получении
     */
    text(textContent) {
      if (typeof textContent === 'undefined') {
        return this.element.textContent
      } else {
        this.element.textContent = textContent
        return this
      }
    }


    
    /* EVENT */


    /**
     * Добавляет слушатель событий в выбранное элемент для указанного типа события
     *
     * @param {string} eventType - The type of event to listen for (e.g.), 'click', 'input', etc.).
     * @param {function(Event): void} callback - Функция слушателя событий для выполнения, когда событие запускается.Звонок, когда событие запускается.Функция получит объект события в качестве аргумента.
     * @returns {Rquery} Текущий экземпляр запроса для цепочки..
     */
    on(eventType, callback) {
      if (typeof eventType !== 'string' || typeof callback !== 'function') {
        throw new Error (
          'eventType must be a string and callback must be a function'
        )
      }

      this.element.addEventListener(eventType, callback)
      return this
    }


    /**
     * Присоединяет прослушиватель событий щелчка к выбранному элементу.
     * @param {function(event): void} callback - Функция прослушивателя событий, которая будет выполняться при щелчке по выбранному элементу. Функция получит объект события в качестве аргумента.
     * @returns {RQuery} Текущий экземпляр RQQUERY для цепочки
     */
    click(callback) {
        this.element.addEventListener('click', callback)
        return this
    }


    /* FORM */

    /**
     *Получает или устанавливает значение элемента.
     *
     * Если аргумент не предоставлен, возвращает текущее значение элемента.
     * Если значение предоставляется, устанавливает значение элемента на новое значение и возвращает экземпляр для цепочки.
     * 
     * @param {string} [newValue] - Новое значение для установки для входного элемента.Если не предоставлен, метод возвращает текущее значение.
     * @returns {string|RQuery} - Если предоставлен NewValue, возвращает экземпляр RQQUERY.В противном случае возвращает текущее значение входного элемента.
     */
    value(newValue) {
      if (typeof newValue === 'undefined') {
        return this.element.value
      } else {
        this.element.value = newValue
        return this
      }
    }

    /**
     * Установка слушателя событий для события отправки элемента формы
     * 
     * @param {function(Event): void} onSubmit - Слушатель событий для события отправки формы.
     * @returns {RQuery} Текущий экземпляр запроса для цепочки.
     */
    submit(onSubmit) {
      if (this.element.tagName.toLowerCase() === 'form'){
        this.element.addEventListener('submit', e => {
          e.preventDefault()
          onSubmit(e)
        })
      } else {
        throw new Error('Element must be a form')
      }
      return this
    }

    /**
     * Sets attributes and event listeners for an input element.
     * @param {object} options - Объект, содержащий параметр ввода.
     * @param {function(event): void} [options.onInput] - The event listener for the input's input event.
     * @param {Object} [options.rest] - Optional attributes to set on the input element.
     * @returns {RQuery} The current Rquery instanse for chaining.
     */
    input({onInput, ...rest}) {
      if (this.element.tagName.toLowerCase() !== 'input') 
        throw new Error ('Element must be an input')
      
      for (const [key, value] of Object.entries(rest)) {
        this.element.setAttribute(key, value)
      }

      if (onInput) {
        this.element.addEventListener('input', onInput)
      }
      return this
    }


    /**
     * Set attribute and event listeners for a number input element
     * @param {number} [limit] - The maximum length of the input value.
     * @return {RQuery} The current Rquery instanse for chaining.
     */
    numberInput(limit) {
      if (this.element.tagName.toLowerCase() !== 'input' ||
          this.element.type !== 'number'
      )
          throw new Error ('Element must be an input with type "number"')

      this.element.addEventListener('input', event => {
        let value = event.target.value.replace(/[^0-9]/g, '')
        if (limit) value = value.substring(0, limit)
          event.target.value = value
      })
    }
    

    /**
     * Set attribute and event listeners for a credit card number input element
     * @return {RQuery} The current Rquery instanse for chaining.
     */
    creditCardInput() {
      const limit = 16
      if (this.element.tagName.toLowerCase() !== 'input' ||
          this.element.type !== 'text'
      )
          throw new Error ('Element must be an input with type "text"')

      this.element.addEventListener('input', event => {
        let value = event.target.value.replace(/[^0-9]/g, '')
        if (limit) value = value.substring(0, limit)
        event.target.value = formatCardNumberWithDashes(value)
      })

      return this
    }

    /* STYLES */

    
    /**
     * Показывает элемент, удалив свойство «дисплея» из его стиля.
     * Это позволяет элементу быть видимым в соответствии с типом display по умолчанию.
     * @returns {RQuery} The current Rquery instanse for chaining.
     */
    show() {
      this.element.style.removeProperty('display')
      return this
    }


    /**
     * Скрывает элемент, устанавливая свой стиль display на «none».
     * @returns {RQuery} The current Rquery instanse for chaining..
     */
    hide() {
      this.element.style.display = 'none'
      return this
    }

    /**
     * Sets the CSS style of the selected element.
     * @param {string} property - The CSS property to set.
     * @param {string} value - The value to set for the CSS property.
     * @returns {RQuery} The current RQuery instance for chaining.
     * @throws {Error} If property or value is not a string.
     */
    css(property, value) {
        
        if (typeof property !== 'string' || typeof value !== 'string') {
            throw new Error('property and value must be string')
        }

        this.element.style[property] = value
        return this
    }


    /**
     * Adds one or more CSS classes to the current element.
     * @param {string | string[]} classNames - A single class name or an array of class names to add to the element
     * @returns {RQuery} the current Rquery instanse for chaining
     */
    addClass(classNames){
        if (Array.isArray(classNames)) {
            for (const className of classNames)  {
                this.element.classList.add(className)
            }
        } else {
            this.element.classList.add(classNames)
        }

        return this
    }
    
        /**
     * Remove a class or a list classes from the current element.
     * @param {string | string[]} classNames - A single class name or an array of class names to add to the element
     * @returns {RQuery} the current Rquery instanse for chaining
     */
    removeClass(classNames){
        if (Array.isArray(classNames)) {
            for (const className of classNames)  {
                this.element.classList.remove(className)
            }
        } else {
            this.element.classList.remove(classNames)
        }

        return this
    }

    /**
     * Append a new element as a child of the selected element
     * @param {HTMLElemen} childElement  the new child element to append
     * @returns {RQuery} The current RQuery instanse for chaining
     */
    append(childElement) {
        this.element.appendChild(childElement)
        return this
    }

    /**
     * Insert a new element before the selected element
     * @param {HTMLElement} newElement - The new element to insert before the selected element
     * @returns {RQuery} The current Rquery instanse for chaining 
     */
    before(newElement) {
        if (!(newElement instanceof HTMLElement)) {
            throw new Error ('Element must be an HTMLElement')
        }

        const parentElement = this.element.parentElement
        console.log(this.element);

        if(parentElement) {
            parentElement.insertBefore(newElement, this.element)
            
            return this
        } else {
            throw new Error('Element does not have a parent element')
        }
        
    }


    /**
    * Gets or sets the value of an attribute on the selected element.
    * If only the attributeName is provided, it returns the value of the attribute.
    * If both attributeName and value are provided, it sets the attribute to the given value.
    *
    * @param {string} attributeName - The name of the attribute to get or set.
    * @param {string} [value] - The value to set for the attribute. If undefined, the method returns the current value of the attribute.
    * @returns {RQuery|string} The current Rquery instanse for chaining (if setting) or the attribute value (if getting)
    * @throws {Error} If attributeName is not a string.
    */
    attr( attributeName, value) {
      if (typeof attributeName !== 'string') {
        throw new Error ('Attribute name must be a string')
      }

      if (typeof value === 'undefined') {
        return this.element.getAttribute(attributeName)
      } else {
        this.element.setAttribute(attributeName, value)
        return this
      }
    }



    /**
     * Удаляет атрибут из текущего элемента.
     *
     * @param {string} attrName - Название атрибута для удаления.
     * @returns {RQuery}  The current Rquery instanse for chaining.
     */
    removeAttr(attrName) {
      if (typeof attrName !== 'string') {
        throw new Error('attrName must be a string')
      }

      this.element.removeAttribute(attrName)
      return this
    }
}

/**
 * Creates a new RQuery instance от получаемого селектора.
 *
 * @param {string|HTMLElement} selector - css selector string or an HTMLElemen.
 * @returns {RQuery} A new RQuery instance for the given selector.
 */
export function $R(selector) {
    return new RQuery(selector)
}