const { test, expect } = require('../support')

const data = require('../support/fixtures/movies.json')

// const {executeSQL} = require('../support/database')

// test.beforeAll( async ()=>{
//     await executeSQL(`DELETE from movies`)
// })

test('Deve poder cadastrar um novo filme como conteudo destaque', async ({page}) => {

    const movie = data.resident_evil_o_hospede_maldito
    
    await page.login.doLogin('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.feature)

    await page.componentPopup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`)
})

test('Deve poder cadastrar um novo filme sem conteudo destaque', async ({page}) => {

    const movie = data.guerra_mundial_z
    
    await page.login.doLogin('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.feature)

    await page.componentPopup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`)
})

test.skip('Nao deve cadastrar titulo duplicado', async ({page, request}) => {

    const movie = data.guerra_mundial_z
    
    await request.api.postMovie(movie) // cadastra o filme via api
    
    await page.login.doLogin('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.feature)
    await page.componentPopup.haveText('Este conteudo ja encontra-se cadastrado no catalogo')
})

test('Nao deve cadastrar quando os campos obrigatorios nao sao preenchidos', async ({page}) => {
    await page.login.doLogin('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.goForm()
    await page.movies.submit()

    await page.movies.alertHaveText(['Campo obrigatório', 'Campo obrigatório', 'Campo obrigatório', 'Campo obrigatório'])
})

test.skip('Deve excluir um filme', async ({page}) => {
    const movie = data.madrugada_dos_mortos
    await request.api.postMovie(movie)

    await page.login.doLogin('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.remove()

    await page.componentPopup.haveText('Filme removido com sucesso.')
})