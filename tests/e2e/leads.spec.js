const { test, expect } = require('../support')

const {faker} = require('@faker-js/faker')

test('Deve cadastrar um lead na fila de espera', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openModel()
  await page.leads.submitLeadForm(faker.person.fullName(), faker.internet.email())
  
  const msgPopup = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.'
  await page.componentPopup.haveText(msgPopup)
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

  await page.leads.visit()
  await page.leads.openModel()
  await page.leads.submitLeadForm(leadName, leadEmail)
  
  const msgPopup = 'Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.'
  await page.componentPopup.haveText(msgPopup)
});

test('Nao deve cadastrar com email incorreto', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openModel()
  await page.leads.submitLeadForm('Bruno Ricardo Camara Noberto', 'bruno.com')

  await page.leads.alertHaveText('Email incorreto')
});

test('Nao deve cadastrar quando o nome nao foi preenchido', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openModel()
  await page.leads.submitLeadForm('', 'bruno@yahoo.com')

  await page.leads.alertHaveText('Campo obrigatório')
});

test('Nao deve cadastrar quando o email nao foi preenchido', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openModel()
  await page.leads.submitLeadForm('Bruno Ricardo Camara Noberto', '')

  await page.leads.alertHaveText('Campo obrigatório')
});

test('Nao deve cadastrar quando nenhum campo foi preenchido', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openModel()
  await page.leads.submitLeadForm('', '')

  await page.leads.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
});
