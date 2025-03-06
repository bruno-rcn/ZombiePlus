const { test, expect } = require('../support')

const {faker} = require('@faker-js/faker')

test('Deve cadastrar um lead na fila de espera', async ({ page }) => {
  await page.landPage.visit()
  await page.landPage.openModel()
  await page.landPage.submitLeadForm(faker.person.fullName(), faker.internet.email())
  
  const msgToast = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await page.componentToast.haveText(msgToast)
});

test('Nao deve cadastrar um email que ja existe', async ({ page, request }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()
  
  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  expect(newLead.ok()).toBeTruthy()

  await page.landPage.visit()
  await page.landPage.openModel()
  await page.landPage.submitLeadForm(leadName, leadEmail)
  
  const msgToast = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await page.componentToast.haveText(msgToast)
});

test('Nao deve cadastrar com email incorreto', async ({ page }) => {
  await page.landPage.visit()
  await page.landPage.openModel()
  await page.landPage.submitLeadForm('Bruno Ricardo Camara Noberto', 'bruno.com')

  await page.landPage.alertHaveText('Email incorreto')
});

test('Nao deve cadastrar quando o nome nao foi preenchido', async ({ page }) => {
  await page.landPage.visit()
  await page.landPage.openModel()
  await page.landPage.submitLeadForm('', 'bruno@yahoo.com')

  await page.landPage.alertHaveText('Campo obrigatório')
});

test('Nao deve cadastrar quando o email nao foi preenchido', async ({ page }) => {
  await page.landPage.visit()
  await page.landPage.openModel()
  await page.landPage.submitLeadForm('Bruno Ricardo Camara Noberto', '')

  await page.landPage.alertHaveText('Campo obrigatório')
});

test('Nao deve cadastrar quando nenhum campo foi preenchido', async ({ page }) => {
  await page.landPage.visit()
  await page.landPage.openModel()
  await page.landPage.submitLeadForm('', '')

  await page.landPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
});
