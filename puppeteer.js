const puppeteer = require('puppeteer');
const GoogleApi = require('./infra/google-api');

let main = async () => {
    
    
    const browser = await puppeteer.launch({headless: true,defaultViewport:{width:1024,height:768}})
    const page = (await browser.pages())[0];
 
    await page.goto("https://suap.ifrn.edu.br");
    
    await page.waitForSelector("#id_username");
    console.log("#id_username");
    await page.type("#id_username","1475450");
    await page.waitForSelector("#id_password");
    console.log("#id_password");
    await page.type("#id_password","Info20191");
    await page.waitForSelector("input[type='submit']");
    await page.click("input[type='submit']");
    console.log("input[type='submit']");
    try{
      await page.waitForSelector("#user-tools",{timeout:30000});
      console.log("#user-tools");
    }catch(e){
      await page.screenshot({fullPage: true, path: 'screenshot.png'});
    }
    
  
    
   
    browser.close();
  };
   
  
  main();

 
