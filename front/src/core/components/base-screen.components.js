import { getTitle } from '@/config/seo.config'

export class BaseScreen {
    /**
     * Созадание нового BaseScreen instance 
     * @param {Object} options - The option for the BaseScreen
     * @param {string} options.title - The title for the BaseScreen
    */
    constructor({title}){
        document.title = getTitle(title)
    }
    /**
     * Рендер дочернего компонента
     * @returns {HTMLElement} - Возвращает HTML-элемент
    */
    render() {
        throw new Error('Метод рендеринга должен быть реализован в дочернем классе')
    }
}