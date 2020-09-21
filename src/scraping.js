/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-var-requires */
const puppeteer = require('puppeteer');
const fs = require('fs');

const PAGE_URL = 'https://g1.globo.com/loterias/megasena.ghtml';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(PAGE_URL);

  const content = await page.evaluate(() => {
    let contestData = {};
    let results = [];
    const removeSpace = (text) => text.trim();
    const hasWinner = (array) => !array.includes('ACUMULADO');

    const $lotteryInfo = document.querySelector('.content-lottery__info');
    const $lotteryAmmount = document.querySelector('.content-lottery__ammount');
    const $lotteryResults = document.querySelectorAll('.content-lottery__result');

    const lotteryInfo = $lotteryInfo.innerText.split('-');
    const lotteryAmmount = $lotteryAmmount.innerText.replace(':', '').split(' ');

    $lotteryResults.forEach((item) => results.push(item.innerText));

    contestData = {
      name: removeSpace(lotteryInfo[0]),
      date: removeSpace(lotteryInfo[1]),
      hasWinner: hasWinner(lotteryAmmount),
      prize: hasWinner(lotteryAmmount) ? '' : lotteryAmmount[2],
      results,
    };

    return contestData;
  });

  const jsonData = JSON.stringify(content);
  fs.writeFileSync(`${__dirname}/contest.json`, jsonData);

  await browser.close();
})();
