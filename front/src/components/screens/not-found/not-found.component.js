import { BaseScreen } from '@/core/components/base-screen.components'

export class NotFound extends BaseScreen {
     constructor() {
        super({title: 'Not Found'})
    }
    render() {
        return '<div>Not Found</div>'
    }
}