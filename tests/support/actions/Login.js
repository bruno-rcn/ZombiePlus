const {expect} = require('@playwright/test')

export class Login{

    constructor(page){
        this.page = page
    }

    async doLogin(email, password, username){
        await this.visit()
        await this.loginSubmit(email, password)
        await this.isLoggedIn(username)
    }

    async visit(){
        await this.page.goto('/admin/login')

        const loginForm = this.page.locator('.login-form')
        await expect(loginForm).toBeVisible()
    }

    async loginSubmit(email, password){
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)
        await this.page.getByText('Entrar').click()
    }

    async alertHaveText(text){
        const alert = this.page.locator('span[class$="alert"]')
        await expect(alert).toHaveText(text)
    }

    async isLoggedIn(username){
        await expect(this.page.locator('.logged-user')).toHaveText(`Olá, ${username}`)
    }
}