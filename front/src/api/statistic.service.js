import { aQuery } from "@/core/a-query/a-query.lib"

export class StatisticService {
  #BASE_URL = '/statistics'

  main(onSuccess) {
    return aQuery ({
      path: this.#BASE_URL,
      onSuccess
    })
  }
}