const puppeteer = require("puppeteer-extra")
const StealthPlugin = require("puppeteer-extra-plugin-stealth")
const prompt = require("prompt-sync")()
puppeteer.use(StealthPlugin())

function getProductIDFromURL(productLink) {
    const productIDIndex = productLink.lastIndexOf("-")
    const productID = productLink.substring(productIDIndex + 1)
    console.log(productID)
    return productID
}

async function addToCart(page, productLink) {
    let productID = getProductIDFromURL(productLink)
    console.log("Waiting for button to load...")
    const addToCartButton = await page.waitForSelector(`button[id='addToCartButtonOrTextIdFor${productID}']`)
    console.log("Button loaded!")
    await addToCartButton.click()
    console.log("Added to cart!")
}

async function run() {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    let productLink = prompt("Enter the product URL: ")
    await page.goto(productLink)
    await addToCart(page, productLink)
}

run()