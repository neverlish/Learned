const puppeteer = require('puppeteer')
const faker = require('faker')
const devices = require('puppeteer/DeviceDescriptors')
const iPhone = devices['iPhone 6']

const user = {
  email: faker.internet.email(),
  password: 'test',
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
}

const isDebugging = () => {
  const debugging_mode = {
    headless: false,
    slowMo: 250,
    devtools: true
  }
  return process.env.NODE_ENV === 'debug' ? debugging_mode : {}
}

let browser
let page

beforeAll(async() => {
  browser = await puppeteer.launch(isDebugging())
  page = await browser.newPage()
  await page.goto('http://localhost:3000')
  page.setViewport({ width: 500, height: 2400 })
})

describe('on page load', () => {
  test('h1 does correctly', async() => {
    const html = await page.$eval('.App-title', e => e.innerHTML)
    
    expect(html).toBe('Welcome to React')
  }, 16000)

  test('nav loads correctly', async() => {
    const navbar = await page.$eval('[data-testid="navbar"]', el => el ? true : false)
    const listItems = await page.$$('[data-testid="navBarLi"]')

    expect(navbar).toBe(true)
    expect(listItems.length).toBe(4)
  })

  test('login form works correctly', async() => {
    const page2 = await browser.newPage()
    await page2.emulate(iPhone)
    await page2.goto('http://localhost:3000/')


    const firstName = await page2.$('[data-testid="firstName"]')
    const lastName = await page2.$('[data-testid="lastName"]')
    const email = await page2.$('[data-testid="email"]')
    const password = await page2.$('[data-testid="password"]')
    const submit = await page2.$('[data-testid="submit"]')

    await firstName.tap()
    await page2.type('[data-testid="firstName"]', user.firstName)

    await lastName.tap()
    await page2.type('[data-testid="lastName"]', user.lastName)

    await email.tap()
    await page2.type('[data-testid="email"]', user.email)

    await password.tap()
    await page2.type('[data-testid="password"]', user.password)

    await submit.tap()

    await page2.waitForSelector('[data-testid="success"]')
  }, 100000)
})

afterAll(() => {
  if (isDebugging) {
    browser.close()
  }
})
