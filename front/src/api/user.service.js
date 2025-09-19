import { aQuery } from "@/core/a-query/a-query.lib"

export class UserService {
  #BASE_URL = '/users'

  getAll(searchTerm, onSuccess) {
    return aQuery({
      path: `${this.#BASE_URL}${searchTerm ? `?${new URLSearchParams({ searchTerm })}` : ''}`,
        onSuccess
      })
  }
}