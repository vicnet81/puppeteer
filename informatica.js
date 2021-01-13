const puppeteer = require('puppeteer');
const GoogleApi = require('./infra/google-api');

let main = async () => {
    let students = (await GoogleApi.cells("1aVu6LODvFYFZbriMlJS1he0w3-zZ8pw6XAyvyu4RChY","backup!B2:E"))
      .map(row=>{return {
        name: row[0],
        email: row[1],
        firstGrade: row[2],
        secondGrade: row[3]
      }});
    
    let courses = (await GoogleApi.cells("1aVu6LODvFYFZbriMlJS1he0w3-zZ8pw6XAyvyu4RChY","courses!A2:B"))
    .map(row=>{return {
      id: row[0],
      name: row[1]
    }});

    const browser = await puppeteer.launch({headless: false,defaultViewport:{width:1024,height:768}})
    const page = await browser.newPage();
    const studentPage = await browser.newPage();
    await page.goto("https://suap.ifrn.edu.br");

    await page.waitForSelector("#content");
    await page.type("#id_username","1475450");
    await page.type("#id_password","Info20191");
    await page.click("input[type='submit']");
    for(course of courses){
      
      await page.goto(`https://suap.ifrn.edu.br/edu/meu_diario/${course.id}/1/?tab=notas`);
      await page.waitForSelector("#table_notas .int");
      let grades = await page.$$("#table_notas>tbody>tr:not(.disabled)");
      console.log(`${course.name}: und1`);
      for(grade of grades){
        try{
          let name = await grade.$eval("td:nth-child(2)",el=>el.innerHTML.match(/<dd[^>]*>\n(?<name>[^\n]*)\n/).groups.name.trim());
          student = students.find(student=>student.name==name);
          if(!student){
            let studentUrl = await (await (await grade.$("td:nth-child(2) a")).getProperty("href")).jsonValue(); 
            await studentPage.goto(studentUrl+"?tab=dados_pessoais");
            await studentPage.waitForSelector("div[data-tab=dados_pessoais]");
            let match = await studentPage.$eval("div[data-tab=dados_pessoais]",el=>el.outerHTML.match(/[\.|a-z|0-9]+@escolar.ifrn.edu.br/g));
            if(match){
              console.log(match);
              student = students.find(student=>student.email==match[0]);
            }
          }
          if(student){          
            let input = await grade.$("input");
            await input.click({ clickCount: 2 });
            await input.type(student.firstGrade);
            await input.press("Tab");
            console.log(`${name} atualizado!`);
          }else{
            console.log(`${name} não encontrado!`); 
          }
        }catch(e){
          console.log(e);
          console.log(student);
        }
      }

      await page.click("#table_notas");
      await page.goto(`https://suap.ifrn.edu.br/edu/meu_diario/${course.id}/2/?tab=notas`);
      await page.waitForSelector("#table_notas");
      grades = await page.$$("#table_notas>tbody>tr:not(.disabled)");
      console.log(`${course.name}: und2`);
      for(grade of grades){
        try{
          let name = await grade.$eval("td:nth-child(2)",el=>el.innerHTML.match(/<dd[^>]*>\n(?<name>[^\n]*)\n/).groups.name.trim());
          student = students.find(student=>student.name==name);
          if(!student){
            let studentUrl = await (await (await grade.$("td:nth-child(2) a")).getProperty("href")).jsonValue(); 
           
            await studentPage.goto(studentUrl+"?tab=dados_pessoais");
            await studentPage.waitForSelector("div[data-tab=dados_pessoais]");
            let match = await studentPage.$eval("div[data-tab=dados_pessoais]",el=>el.outerHTML.match(/[\.|a-z|0-9]+@escolar.ifrn.edu.br/g));
            if(match){
              student = students.find(student=>student.email==match[0]);
            }
          }
          if(student){
            let input = await grade.$("input");
            await input.click({ clickCount: 2 });
            await input.type(student.secondGrade);
            await input.press("Tab");
            console.log(`${name} atualizado!`);
          }else{
            console.log(`${name} não encontrado!`); 
          }
        }catch(e){
          console.log(student);
          console.log(e);
        }
      }
      
    }

   
    browser.close();
  };
   
  
  main();

 
