
import RenderService from "@/core/services/render.service"
import ChildComponent from "@/core/components/child.component"

import styles from './user-item.module.scss'
import template from './user-item.template.html'
import { $R } from "@/core/rquery/rquery.lib"

export class UserItem extends ChildComponent {
  constructor(user, isGray = false, onClick) {
    super()

    if (!user) throw new  Error('User should be passed!')
    if (!user?.name) throw new  Error('User must have a "name"!')
    if (!user?.avatarPath) throw new  Error('User must have a "avatarPath"!')

      this.user = user
      this.onClick = onClick
      this.isGray = isGray
  }

  #preventDefault(event) {
    event.preventDefault()
  }

  update({ avatarPath, name }) {
    if (avatarPath && name) {
      
      $R(this.element).find('img').attr('src', avatarPath).attr('alt', name)

      $R(this.element).find('span').text(name)
    }
  }
  render() {
    this.element = RenderService.htmlToElement(template, [], styles)
    console.log(this.user)
    
    this.update(this.user)

    $R(this.element).click(this.onClick || this.#preventDefault.bind(this))

    if (!this.onClick) $R(this.element).attr('disabled', '')
    if(this.isGray) $R(this.element).addClass(styles.gray)
    return this.element
  }
}
