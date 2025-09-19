import { aQuery } from "@/core/a-query/a-query.lib"
import { NotificationService } from "@/core/services/notification.service"
import { StorageService } from "@/core/services/storage.service"
import { Store } from "@/core/store/store"

export class AuthService {
  #BASE_URL = '/auth'

  constructor() {
    this.store = Store.getInstance()
    this.notificationService = new NotificationService()
  }

  main(type, body) {
    return aQuery({
      path: `${this.#BASE_URL}/${type}`,
      body,
      onSuccess: data => {
        this.store.login(data.user, data.accessToken)
        this.notificationService.show(
          'success',
          'You have successfully logged in'
        )
      },
      method: 'POST'
    })
  }
}