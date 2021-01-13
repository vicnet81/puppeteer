const puppeteer = require('puppeteer');

let browser,page;
let main = async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    let response = await page.goto("https://servidor.vicentepires.repl.co/teste").catch(e=>console.log("teste"));
    console.log(response);
    browser.close();
}

main();

