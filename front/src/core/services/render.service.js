import ChildComponent from "../components/child.component"

class RenderService {
    // htmlToElement

    /** 
     * @param {string} html-верстка 
     * @param {Array} components 
     * @param {Object} [styles] 
     * @returns {HTMLElement} 
    */
    htmlToElement(html, components=[], styles) {
        const template = document.createElement('template')
        console.log(template);
        
        template.innerHTML = html.trim() // убираем пробелы
        const element = template.content.firstChild  // извлекаем первый узел верстки
        console.log(element)
        
        // styles
        if (styles) {
          this.#applyModuleStyles(styles, element)
        }
        
        this.#replaceComponentTags(element, components)
        console.log(element instanceof HTMLElement)

        return element
    }
    /** 
     * @param {HTMLElement} parenElement 
     * @param {Array} components 
    */
    #replaceComponentTags(parentElement, components) {
        const componentTagPattern = /^component-/ // регулярное выражение для поиска тегов компонентов
        const allElements = parentElement.getElementsByTagName('*') // получаем все узлы верстки

        for (const element of allElements) {
            const elementTagName = element.tagName.toLowerCase()
            if (componentTagPattern.test(elementTagName)) { // если тег соответствует регулярному выражению
                const componentName = elementTagName
                    .replace(componentTagPattern, '')
                    .replace(/-/g, '')
                
                const foundComponent = components.find(Component => {
                    const instance = Component instanceof ChildComponent ? Component : new Component()
                    return instance.constructor.name.toLowerCase() === componentName
                })

                if (foundComponent) {
                    const componentContent =
                        foundComponent instanceof ChildComponent
                            ? foundComponent.render()
                            : new foundComponent().render()
                    element.replaceWith(componentContent)
                } else {
                    console.error(
                        `Component "${componentName}" not found in the provided component array.`
                    )
                }


            }
        }

    }


    
    // styles
    /**
     * @param {Object} moduleStyles
     * @param {string} element
     * @returns {void} void - ничего не возвращает
     * @private
     */
    #applyModuleStyles(moduleStyles, element) {
        if (!element) return // если нет елемента - выходим из функции

        const applyStyles = element => {
            for (const [key, value] of Object.entries(moduleStyles)) {
                if (element.classList.contains(key)) {
                    element.classList.remove(key)
                    element.classList.add(value)
                }
            }
        }

        if (element.getAttribute('class')) {
            applyStyles(element)
        }

        const elements = element.querySelectorAll('*')
        
        elements.forEach(applyStyles)
    }
}

export default new RenderService()