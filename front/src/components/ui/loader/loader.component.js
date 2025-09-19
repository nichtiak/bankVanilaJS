
import RenderService from "@/core/services/render.service"
import ChildComponent from "@/core/components/child.component"


import template from './loader.template.html'
import { $R } from "@/core/rquery/rquery.lib"

export const LOADER_SELECTOR = '[data-component="loader"]'

export class Loader extends ChildComponent {
constructor (width = 100, height = 100) {
  super()

  this.width = width
  this.height = height
}
  render() {
    this.element = RenderService.htmlToElement(template, [])

    // $R(this.element).css(`width`, `${this.width} px`).css('height', `${this.height}px`).addClass('bounce')
    this.element.style = `width ${this.width}px; height: ${this.height}px`
    this.element.classList.add('bounce')
    return this.element
  }
}
