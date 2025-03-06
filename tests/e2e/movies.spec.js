const { test, expect } = require('../support')

const data = require('../support/fixtures/movies.json')

const {executeSQL} = require('../support/database')

test('Deve poder cadastrar um novo filme', async ({page}) => {

    const movie = data.resident_evil_o_hospede_maldito

    await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`)

    await page.loginPage.visit()
    await page.loginPage.loginSubmit('admin@zombieplus.com', 'pwd123')
    await page.moviesPage.isLoggedIn()

    await page.moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year)

    await page.componentToast.haveText('UhullCadastro realizado com sucesso!')
})