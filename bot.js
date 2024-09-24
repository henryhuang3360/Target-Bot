const puppeteer = require("puppeteer-extra")
const StealthPlugin = require("puppeteer-extra-plugin-stealth")

puppeteer.use(StealthPlugin())

const PRODUCT_LINK = "https://www.target.com/p/playstation-5-console-slim/-/A-90188801"

async function addToCart(page) {
    console.log("Waiting for button to load...")
    const addToCartButton = await page.waitForSelector("button[id='addToCartButtonOrTextIdFor90188801']")
    console.log("Button loaded!")
    await addToCartButton.click()
    console.log("Button clicked!")
}

async function run() {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto(PRODUCT_LINK)
    await addToCart(page)
}

run()