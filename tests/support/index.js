import { test as base, expect } from '@playwright/test';

const { Login } = require('./actions/Login')
const { Toast } = require('./actions/Components')
const { Popup } = require('./actions/Components')
const { Movies } = require('./actions/Movies')
const { Leads } = require('./actions/Leads')
const { Api } = require('./api')

const test = base.extend({
    page: async ({ page }, use) => {

        // context vai receber as funcoes nativas do playwright
        const context = page

        context['login'] = new Login(page),
        context['leads'] = new Leads(page),
        context['movies'] = new Movies(page),
        context['componentToast'] = new Toast(page)
        context['componentPopup'] = new Popup(page)

        await use(context)
    },
    request: async ({request}, use) => {
        const context = request

        context['api'] = new Api(request)
        await context['api'].setToken()

        await use(context)
    }
})

export { test, expect }