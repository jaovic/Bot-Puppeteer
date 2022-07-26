const puppeteer = require("puppeteer");
async function BbBot (){
const browser = await puppeteer.launch({headless: false, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  // cria uma nova pagina
  const page = await browser.newPage();
  // entra na url
  await page.goto("https://google.com");
  // aguarda aparecer a caixa de login
  console.log('dps do google');
  await page.type("[type=text]", "teste");
  await page.screenshot({ path: `${'teste'}.png` });
  await page.click(".gNO89b");
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${'teste2'}.png` });

  await browser.close();
}
BbBot();