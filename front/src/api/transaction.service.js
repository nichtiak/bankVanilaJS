import { aQuery } from "@/core/a-query/a-query.lib"

export  class TransactionService {
  #BASE_URL = '/transactions'

  getAll(onSuccess) {
    return aQuery({
      path: this.#BASE_URL + `?${new URLSearchParams({ orderBy: 'desc' })}`,
      onSuccess
    })
  }
}