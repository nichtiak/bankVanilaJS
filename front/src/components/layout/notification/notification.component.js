
import RenderService from "@/core/services/render.service"
import ChildComponent from "@/core/components/child.component"

import styles from './notification.module.scss'
import template from './notification.template.html'
import { NotificationService } from "@/core/services/notification.service"
import { StorageService } from "@/core/services/storage.service"

export class Notification extends ChildComponent {
  render() {
    this.element = RenderService.htmlToElement(template, [], styles)

    window.storageService = new StorageService()

    return this.element
  }
}
