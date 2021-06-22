const puppeteer = require('puppeteer');
const fs = require('fs');

require('dotenv').config();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(process.env.PAGE_URL);

  const content = await page.evaluate(() => {
    const $lotteryDetails = document.querySelector('.lottery-info > span');
    const lotteryInfos = $lotteryDetails.innerText.trim().split('|');
    const totalInfos = lotteryInfos.length;

    for (let i = 0; i < totalInfos; i++) {
      lotteryInfos[i] = lotteryInfos[i]
        .replace(/\s/g, '')
        .replace(/([A-Z])/g, '')
        .replace('Á', ''); // FIXME: regex

      if (lotteryInfos[i] === '') {
        lotteryInfos.splice(i, 1);
      }
    }

    const $lotteryResults = document.querySelectorAll('.lt-result.no-margin > div');
    const results = [...$lotteryResults].map((item) => item.innerText);

    const $winner = document.querySelector('.winners');
    const hasWinner = $winner.innerText !== 'ACUMULOU';

    const $lotteryAmmount = document.querySelector('.resultHead > .alignCenterValor');
    const ammount = $lotteryAmmount.innerText;

    const data = {
      name: `CONCURSO ${lotteryInfos[0]}`,
      date: lotteryInfos[1],
      hasWinner,
      prize: hasWinner ? '' : ammount,
      results,
    };

    return data;
  });

  const jsonData = JSON.stringify(content);
  fs.writeFileSync(`${__dirname}/contest.json`, jsonData);

  console.log('success');

  await browser.close();
})();
