import { test as base, expect } from '@playwright/test';

const { LoginPage } = require('../pages/LoginPage')
const { Toast } = require('../pages/Components')
const { MoviesPage } = require('../pages/MoviesPage')
const { LandingPage } = require('../pages/LandingPage')

const test = base.extend({
    page: async ({ page }, use) => {
        await use({
            ...page,
            loginPage: new LoginPage(page),
            landPage: new LandingPage(page),
            moviesPage: new MoviesPage(page),
            componentToast: new Toast(page)
        })
    }
})

export { test, expect }