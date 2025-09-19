
import RenderService from "@/core/services/render.service"
import ChildComponent from "@/core/components/child.component"

import styles from './statistics-item.module.scss'
import template from './statistics-item.template.html'
import { $R } from "@/core/rquery/rquery.lib"


/**
 * Представляет компонент статистического элемента с меткой, значением и визуальным вариантом.
* Производит ошибку, если отсутствует какой -либо из необходимых параметров (метка, значение, вариант).
 */
export class StatisticItem extends ChildComponent {

  /**
   * Создает экземпляр статистики.
   * 
   * @param {string} label - Метка, которая будет отображаться в статистическом элементе
   * @param {string|number} value - Значение, которое будет отображаться в статистическом элементе
   * @param {('purple'|'green')} variant - Вариант, который определяет внешний вид статистического элемента.Разрешенные значения: «purple» или «green»
   */
  constructor(label, value, variant) {
    super()

    if (!label || !value || !variant) {
      throw new Error('Label, value and variant (purple, green) required!')
    }

    this.label = label
    this.value = value
    this.variant = variant
  }
  render() {
    this.element = RenderService.htmlToElement(template, [], styles)

    $R(this.element).addClass(styles[this.variant]).addClass('fade-in')
    $R(this.element).find('#statistic-label').text(this.label)
    $R(this.element).find('#statistic-value').text(this.value)
    return this.element
  }
}
