// importando o scrapper
const puppeteer = require("puppeteer");
// importando file system
const fs = require("fs");
// importando o leitor de excel
const xlsx = require("node-xlsx");
// lendo o excel
const obj1 = xlsx.parse(__dirname + "/Excel.xls");
const obj2 = xlsx.parse(fs.readFileSync(__dirname + "/Excel.xls"));
//obj2[0].data -> array de arrays onde a partir do index 1 começam os dados
// console.dir(obj2[0].data)
// exibindo conteúdos obtidos do excell
// console.table(obj2[0].data[0]);
// console.table(obj2[0].data[1]);
// console.table(obj2[0].data[2]);
// console.table(obj2[0].data[3]);
const cpfList: Array<string> = [];
obj2[0].data.forEach((element: never, index: number) => {
  cpfList.push(element[2]);
});
console.dir(cpfList.length - 2);

let screenshootCounter = 1;
// Scrapper function
async function BbBot(cpfList: Array<string>) {
  // function para tirar print da pagina que o bot ta rodando
  const printScreen = async (): Promise<void> => {
    await page.screenshot({ path: `${screenshootCounter}.png` });
    screenshootCounter++;
  };
  //
  // aguarda o browser abrir
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });
  // cria uma nova pagina
  const page = await browser.newPage();
  // entra na url
  await page.setViewport({ width: 1366, height: 768});
  await page.goto(process.env.URL);
  // aguarda aparecer a caixa de login
  await page.waitForSelector(".col-input");
  // tira print
  // printScreen();
  // coloca a senha no input de id="idChave"
  await page.type("#idChaveJ", process.env.LOGIN);
  // coloca a senha no input onde name="password"
  await page.type("[name=password]", process.env.SENHA);
  await page.click("[type=submit]");
  // aguarda a caixa de dialogo aparecer
  await page.waitForTimeout(2000); //aguarda 0.2 segundo
  // await page.waitForSelector(".btn btn-default");
  await page.click("[id=cop_YmYt]"); // clica no x pra fechar o aviso
  await page.waitForTimeout(1000); //aguarda 0.2 segundo
  await page.click('[class="icone icone-users"]'); // clica no card de parceiro
  await page.waitForTimeout(1000); //aguarda 0.2 segundo
  await page.click('[class="icone icone-agricultura"]'); // clica em Parceiro Agro
  await page.waitForTimeout(5000); //aguarda 0.2 segundo
  printScreen()

  // inicio do loop
  for (let i = 2; i <= cpfList.length; i++) {
    console.log("executando este cpf -> ", cpfList[i]);
    await page.hover("[id=cop_CRBf]");
    await page.waitForTimeout(2000); //aguarda 0.2 segundo
    printScreen();
    await page.click("[id=cop_OpSP]");
    await page.waitForTimeout(2000); //aguarda 0.2 segundo
    console.log("pegou intenção");

    printScreen();
    await page.type("[id=idCpfCmp]", cpfList[i]);
    await page.waitForTimeout(2000); //aguarda 0.2 segundo
    printScreen();
    await page.click("[id=cop_oNNt]");
    await page.waitForTimeout(2000); //aguarda 0.2 segundo
    printScreen();
    await page.waitForTimeout(2000); //aguarda 0.2 segundo
    printScreen();
    await page.click("[id=cop_Hifx]"); // clica no NÃO em "Qual a forma de atendimento? Atendimento realizado em feira?"
    await page.waitForTimeout(2000); //aguarda 0.2 segundo
    printScreen();
    await page.click("[id=cop_hyqj]"); //clica no input Selecionar a linha de crédito
    await page.waitForTimeout(2000); //aguarda 0.2 segundo
    printScreen();

    // let linhasDeCredito
    // let quantidadeLinhasDeCredito = false
    // let valueSpan: any[] []

    // while (quantidadeLinhasDeCredito) {
    //   linhasDeCredito = 0
    //   let stringId = `id-option-selecao-com-filtro-${linhasDeCredito}`
    // const divCount = await page.$$eval('div', divs => divs.length);
    //   try {
    //     await page.$eval(`[id=${stringId}]`, (el) => {
    //       valueSpan.push(el.innerText)
    //       linhasDeCredito ++
    //     }
    //   } catch (error) {
    //     quantidadeLinhasDeCredito = true

    //   }

    // }

    // id="cop_PQRK" // onde tem a lista de linha de credito
  }
  printScreen();

  await browser.close();
}
BbBot(cpfList);
