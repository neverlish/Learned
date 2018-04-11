const puppeteer = require('puppeteer')

const isDebugging = () => {
  const debugging_mode = {
    headless: false,
    slowMo: 250,
    devtools: true,
    // executablePath: string,
    // timeout: number,
    // ignoreHTTPSErrors: bool
  }
  return process.env.NODE_ENV === 'debug' ? debugging_mode : {}
}

describe('on page load', () => {
  test('h1 does correctly', async() => {
    let browser = await puppeteer.launch(isDebugging())
    let page = await browser.newPage()

    page.emulate({
      viewport: {
        width: 500,
        height: 2400
      },
      userAgent: ''
    })
  })
})
