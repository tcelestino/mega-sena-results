/* eslint-disable @typescript-eslint/no-var-requires */
const puppeteer = require('puppeteer');
const fs = require('fs');

const PAGE_URL = 'https://g1.globo.com/loterias/megasena.ghtml';
const TYPES = {
  WINNER: 'GANHADOR',
  WINNERS: 'GANHADORES',
  NO_WINNER: 'ACUMULADO',
};

function removeSpace(text) {
  return text.trim();
}

function hasWinner(array) {
  return !array.includes(TYPES.NO_WINNER);
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(PAGE_URL);

  const $lotteryInfo = await page.$('.content-lottery__info');
  const $lotteryAmmount = await page.$('.content-lottery__ammount');

  const lotteryInfo = await $lotteryInfo.evaluate((node) => node.innerText.split('-'));
  const lotteryAmmount = await $lotteryAmmount.evaluate((node) => node.innerText.replace(':', '').split(' '));

  const contestData = {
    name: removeSpace(lotteryInfo[0]),
    date: removeSpace(lotteryInfo[1]),
    hasWinner: hasWinner(lotteryAmmount),
    prize: hasWinner(lotteryAmmount) ? '' : lotteryAmmount[2],
  };

  const jsonData = JSON.stringify(contestData);
  fs.writeFileSync(`${__dirname}/contest.json`, jsonData);
  await browser.close();
})();
