const {expect} = require('@playwright/test')

export class MoviesPage {

    constructor(page){
        this.page = page
    }

    async isLoggedIn(){
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(/.*admin/) // Regex que valida se na url contem o texto admin
    }

    async create(title, overview, company, release_year){
        await this.page.locator('a[href$="register"]').click()

        // quando vc tem um label e seu valor de for e o mesmo do id do input, pode usar o label
        await this.page.getByLabel('Titulo do filme').fill(title)
        await this.page.getByLabel('Sinopse').fill(overview)

        await this.page.locator('#select_company_id .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({hasText: company}).click()

        await this.page.locator('#select_year .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({hasText: release_year}).click()

        await this.page.getByRole('button', {name: 'Cadastrar'}).click()
    }
}