export default class ChildComponent {
    /**
     * Рендер дочернего компонента
     * @returns {HTMLElement} - Возвращает HTML-элемент
    */
    render() {
        throw new Error('REnder method must be implemented in the child class')
    }
}