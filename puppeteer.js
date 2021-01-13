const puppeteer = require('puppeteer');
const GoogleApi = require('./infra/google-api');

let main = async () => {
    
    
    const browser = await puppeteer.launch({headless: true,defaultViewport:{width:1024,height:768}})
    const page = (await browser.pages())[0];
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
    
    await page.goto("https://suap.ifrn.edu.br");
    
    await page.waitForSelector("#id_username");
    console.log("#id_username");
    await page.type("#id_username","1475450");
    await page.waitForSelector("#id_password");
    console.log("#id_password");
    await page.type("#id_password","Info20191");
    await page.waitForSelector("input[type='submit']");
    console.log("input[type='submit']");
    try{
      await page.waitForSelector("#user-tools",{timeout:60000});
      console.log("#user-tools");
    }catch(e){
      await page.screenshot({fullPage: true, path: 'screenshot.png'});
    }
    
  
    
   
    browser.close();
  };
   
  
  main();

 