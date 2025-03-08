const {expect} = require('@playwright/test')

export class Movies {

    constructor(page){
        this.page = page
    }

    async goForm(){
        await this.page.locator('a[href$="register"]').click()
    }

    async submit(){
        await this.page.getByRole('button', {name: 'Cadastrar'}).click()
    }

    async create(title, overview, company, release_year, cover, feature){
        await this.goForm()

        // quando vc tem um label e seu valor de for e o mesmo do id do input, pode usar o label
        await this.page.getByLabel('Titulo do filme').fill(title)
        await this.page.getByLabel('Sinopse').fill(overview)

        await this.page.locator('#select_company_id .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({hasText: company}).click()

        await this.page.locator('#select_year .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({hasText: release_year}).click()

        await this.page.locator('input[name=cover]').setInputFiles('tests/support/fixtures' + cover)

        if(feature == true){
            await this.page.locator('.featured .react-switch').click()
        }

        await this.submit()
    }

    async alertHaveText(target){
        await expect(this.page.locator('.alert')).toHaveText(target)
    }

    async remove(title){
        await this.page.getByRole('row', {name: title}).getByRole('button').click() // await page.click('.request-removal') // ou usar o xpath //td[text()="Nome do filme"]/..//button
        await this.page.click('.confirm-removal')
    }
}