const { test, expect } = require('../support')

test('Deve logar como administrador', async ({page}) => {
    await page.login.visit()
    await page.login.loginSubmit('admin@zombieplus.com', 'pwd123')
    await page.login.isLoggedIn('Admin')
})

test('Nao deve logar com senha incorreta', async ({page}) => {
    await page.login.visit()
    await page.login.loginSubmit('admin@zombieplus.com', 'abc123')

    const msg = "Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."
    await page.componentPopup.haveText(msg)
})

test('Nao deve logar com email incorreto', async ({page}) => {
    await page.login.visit()
    await page.login.loginSubmit('admin@naruto.com', 'pwd123')

    const msg = "Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."
    await page.componentPopup.haveText(msg)
})

test('Nao deve logar quando a senha nao foi preenchida', async ({page}) => {
    await page.login.visit()
    await page.login.loginSubmit('admin@zombieplus.com', '')

    await page.login.alertHaveText('Campo obrigatório')
})

test('Nao deve logar quando o email nao foi preenchido', async ({page}) => {
    await page.login.visit()
    await page.login.loginSubmit('', 'pwd123')

    await page.login.alertHaveText('Campo obrigatório')
})

test('Nao deve logar quando o email e a senha nao foram preenchidos', async ({page}) => {
    await page.login.visit()
    await page.login.loginSubmit('', '')

    await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})

test('Nao deve logar com email invalido', async ({page}) => {
    await page.login.visit()
    await page.login.loginSubmit('admin.com', 'pwd123')

    await page.login.alertHaveText('Email incorreto')
})
