import { NotFound } from '@/components/screens/not-found/not-found.component'
import { Layout } from '@/components/layout/layout.component'
import { ROUTES } from './routes.data'
import { $R } from '../rquery/rquery.lib'

export class Router {
	#routes = ROUTES
	#currentRoute = null
    #layout = null // создаем переменную для хранения инстанса компонента, чтоб было понимание разворачивали его или нет
	constructor() {
    window.addEventListener('popstate', () => {
      this.#handleRouteChange()
    })
		this.#handleRouteChange()
    this.#handleLinks()
        
	}

    #handleLinks() {
        document.addEventListener('click', event => {
            const target = event.target.closest('a')
            if (target) {
                event.preventDefault()
                this.navigate(target.href)
            }
        })
    }

	getCurrentPath() {
		return window.location.pathname // получаем текущий путь
	}

    navigate(path) {
        if (path !== this.getCurrentPath()) {
            window.history.pushState({}, '', path) // добавляем в историю новый путь
            this.#handleRouteChange() // обновляем страницу
        }
    }


	#handleRouteChange() {
		const path = this.getCurrentPath() || '/'
		let route = this.#routes.find(route => route.path === path) // находим роут по пути
		if (!route) {
			route = {
				component: NotFound
			}
		}

		this.#currentRoute = route
		this.#render()
	}
	#render() {
		const component = new this.#currentRoute.component().render() // создаёт экземпляр компонента для текущего маршрута и вызывает его метод render()
        
        if (!this.#layout) {
            this.#layout = new Layout({
                router: this,
                children: component
            }).render()

            $R('#app').html('').append(this.#layout)
	    } else {
        console.log(this.#layout);
        
            $R('#content').html('').append(component)
        }
    }
}
