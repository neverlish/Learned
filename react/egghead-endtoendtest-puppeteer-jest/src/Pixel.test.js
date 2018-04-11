const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')
const iPhone = devices['iPhone 6']
const pixelText = require('./diffImages.js')

let browser
let page
beforeAll(async() => {
  browser = await puppeteer.launch({ headless: false })
  page = await browser.newPage()
  await page.goto('http://localhost:3000')
  await page.emulate(iPhone)
})

describe('screenshots are correct', () => {
  it('/index', async() => {
    const file = 'screenshot.png'
    await page.screenshot({ path: file })
    return pixelText.compareScreenshots(file)
  })
})

afterAll(() => {
  browser.close()
})
