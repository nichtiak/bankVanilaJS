import RenderService from "@/core/services/render.service"
import ChildComponent from "@/core/components/child.component"

import styles from './contacts.module.scss'
import template from './contacts.template.html'
import { TRANSFER_FIELD_SELECTOR, TransferField } from "./transfer-field/transfer-field.component"
import { Heading } from "@/components/ui/heading/heading.component"
import { Store } from "@/core/store/store"
import { UserService } from "@/api/user.service"
import { Loader, LOADER_SELECTOR } from "@/components/ui/loader/loader.component"
import { $R } from "@/core/rquery/rquery.lib"
import { formatCardNumberWithDashes } from "@/utils/format/format-card-number"
import { UserItem } from "@/components/ui/user-item/user-item.component"

export class Contacts extends ChildComponent {
  constructor() {
    super()
    this.store = Store.getInstance().state
    this.userService = new UserService()
  }

  fetchData() {
    this.userService.getAll(null, data => {
      if (!data) return

      this.element.querySelector(LOADER_SELECTOR).remove()

      for (const user of data) {
        $R(this.element)
          .find('#contacts-list')
          .append(
            new UserItem(user, true, () => {
              $R(TRANSFER_FIELD_SELECTOR).value(
              formatCardNumberWithDashes(user.card.number)
              )
            }).render()
          )
      }

      $R(this.element)
        .find('#contacts-list')
        .findAll('button')
        .forEach(contactElement => {
          contactElement.addClass('fade-in')
        })
    })
  }
  render() {
    this.element = RenderService.htmlToElement(template, [TransferField, new Heading('Transfer money')], styles)

    if (this.store.user) {
      $R(this.element)
        .find('#contacts-list')
        .html(new Loader().render().outerHTML)

      setTimeout(() =>this.fetchData(), 500)
    
    }
    return this.element
  }
}
