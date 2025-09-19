
import RenderService from "@/core/services/render.service"
import ChildComponent from "@/core/components/child.component"

import styles from './donut-chart.module.scss'
import template from './donut-chart.template.html'
import { $R } from "@/core/rquery/rquery.lib"

/**
 * Класс Donutchart для создания простой диаграммы с настраиваемыми параметрами
 */
export class DonutChart extends ChildComponent {
  gap = 15
  /**
   * Создание нового экземпляра Donutchart.
   * 
   * @param {string|HTMLElement} container Элемент Cantainer (либо селектор, либо htmlelement), где будет добавлена ​​диаграмма
   * @param {object[]} data - Массив объекта данных для представления
   * @param {number} data[].value - Значение среза 
   * @param {string} data[].color - Цвет среза 
   * @param {number} [options.size=250] - Диаметр диаграммы пончиков
   * @param {number} [options.donutWidth=50] - Ширина кольца пончика.
   */
  constructor(
    data,
    options = {
      size: 250,
      donutWidth: 50
    }
  ) {
    super()
    this.data = data
    this.size = options.size
    this.donutWidth = options.donutWidth
  }

  /**
   * Рассчитайте общее значение всех срезов
   * 
   * @returns {number} Общая стоимость.
   */
  #calculateTotalValue() {
    return this.data.reduce((acc, slice) => acc + slice.value, 0)
  }


  /**
   * Преобразовать полярные координаты в картезианские координаты.
   * 
   * @param {number} percentage - Процент круга
   * @param {number} radius - Радиус круга.
   * @returns {number[]} Декартовые координаты [x, y].
   * 
   * преобразует полярные координаты в декартовы координаты
   */
  #polarToCartesian(percentage, radius) {
    const angleInDegrees = percentage * 3.6 - 90
    const angleInRadians = (angleInDegrees * Math.PI) / 180
    const x = radius * Math.cos(angleInRadians)
    const y = radius * Math.sin(angleInRadians)
    return [x, y]
  }

  /**
   * Создает элемент SVG и устанавливает его атрибуты.
   * 
   * @returns {SVGElement} Созданный элемент SVG.
   */
  #createSvgElement() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

    svg.setAttribute('width', this.size)
    svg.setAttribute('height', this.size)
    svg.setAttribute(
      'viewBox',
      `-5 -5 ${this.size + this.gap} ${this.size + this.gap}`
    )
    return svg
  }

  /**
   * Создаёт элемент группы SVG и установливает его атрибуты
   * 
   * @returns {SVGElement} Созданный элемент группы SVG.
   */
  #createSvgGroupElement() {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    g.setAttribute(
      'transform',
      `translate(${this.size / 2 + this.gap / 4}, ${this.size / 2 + this.gap / 4})`
    )
    return g
  }

  #createPathElement(slice, pathData) {
    if (!pathData || pathData.includes('NaN')) return

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', pathData)
    path.setAttribute('fill', 'none')
    path.setAttribute('stroke', slice.color)
    path.setAttribute('stroke-width', this.donutWidth)
    return path
  }

  #createSvgPathElement(g) {
    const totalValue = this.#calculateTotalValue()
    const scale = 0.8
    const newSize = this.size * scale
    const radius = newSize / 2
    let accumulatedPercentage = 0

    this.data.forEach(slice => {
      const percentage = (slice.value / totalValue) * 100
      const [startX, startY] = this.#polarToCartesian(
        accumulatedPercentage,
        radius
      )
      accumulatedPercentage += percentage
      const [endX, endY] = this.#polarToCartesian(accumulatedPercentage, radius)
      const largeArcFlag = percentage > 50 ? 1 : 0
      const pathData = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`

      const path = this.#createPathElement(slice, pathData)
      path.classList.add('rotate')
      g.appendChild(path)
    })
  }

  /**
   *Генерирует элемент SVG, представляющий диаграмму
   * 
   * @returns {SVGElement} Элемент SVG, содержащий диаграмму пончиков.
   */
  #getSvg() {
    const svg = this.#createSvgElement()
    const g = this.#createSvgGroupElement()
    this.#createSvgPathElement(g)
    svg.appendChild(g)

    return svg
  }

  /**
   * Рендер диаграммы
   */
  render() {
    this.element = RenderService.htmlToElement(template, [], styles)
    $R(this.element).append(this.#getSvg())
    return this.element
  }
}
