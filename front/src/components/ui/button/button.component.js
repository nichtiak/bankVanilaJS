
import RenderService from "@/core/services/render.service"

import styles from './button.module.scss'
import template from './button.template.html'
import { $R } from "@/core/rquery/rquery.lib"
import ChildComponent from "@/core/components/child.component"

export class Button extends ChildComponent {
    constructor({ children, onClick, variant }) {
        super()
        if (!children) throw new Error('Children is empty')

        this.children = children
        this.onClick = onClick
        this.variant = variant
    }
  render() {
    this.element = RenderService.htmlToElement(template, [], styles)

    $R(this.element).html(this.children).click(this.onClick)
    console.log(this.variant);
    
    if (this.variant) $R(this.element).addClass(styles[this.variant])

    return this.element
  }
}
