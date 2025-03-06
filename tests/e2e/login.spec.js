const { test, expect } = require('../support')

test('Deve logar como administrador', async ({page}) => {
    await page.loginPage.visit()
    await page.loginPage.loginSubmit('admin@zombieplus.com', 'pwd123')
    await page.moviesPage.isLoggedIn()
})

test('Nao deve logar com senha incorreta', async ({page}) => {
    await page.loginPage.visit()
    await page.loginPage.loginSubmit('admin@zombieplus.com', 'abc123')

    const msg = "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."
    await page.componentToast.haveText(msg)
})

test('Nao deve logar com email incorreto', async ({page}) => {
    await page.loginPage.visit()
    await page.loginPage.loginSubmit('admin@naruto.com', 'pwd123')

    const msg = "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."
    await page.componentToast.haveText(msg)
})

test('Nao deve logar quando a senha nao foi preenchida', async ({page}) => {
    await page.loginPage.visit()
    await page.loginPage.loginSubmit('admin@zombieplus.com', '')

    await page.loginPage.alertHaveText('Campo obrigatório')
})

test('Nao deve logar quando o email nao foi preenchido', async ({page}) => {
    await page.loginPage.visit()
    await page.loginPage.loginSubmit('', 'pwd123')

    await page.loginPage.alertHaveText('Campo obrigatório')
})

test('Nao deve logar quando o email e a senha nao foram preenchidos', async ({page}) => {
    await page.loginPage.visit()
    await page.loginPage.loginSubmit('', '')

    await page.loginPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})

test('Nao deve logar com email invalido', async ({page}) => {
    await page.loginPage.visit()
    await page.loginPage.loginSubmit('admin.com', 'pwd123')

    await page.loginPage.alertHaveText('Email incorreto')
})
