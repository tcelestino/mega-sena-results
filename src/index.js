const puppeteer = require('puppeteer');
const fs = require('fs');
require('dotenv').config();

// Function to clean and format lottery information
function formatLotteryInfo(lotteryInfos) {
  return lotteryInfos
    .map((info) =>
      info
        .replace(/\s/g, '')
        .replace(/([A-Z])/g, '')
        .replace('Á', '')
    )
    .filter((info) => info !== '');
}

// Function to extract lottery results
function extractResults($lotteryResults) {
  return [...$lotteryResults].map((item) => item.innerText);
}

// Function to scrape lottery data from the page
async function scrapeLotteryData(page) {
  return page.evaluate(() => {
    const $lotteryDetails = document.querySelector('.lottery-info > span');
    const lotteryInfos = $lotteryDetails.innerText.trim().split('|');
    const formattedInfos = formatLotteryInfo(lotteryInfos);

    const $lotteryResults = document.querySelectorAll('.lt-result.no-margin > div');
    const results = extractResults($lotteryResults);

    const $winner = document.querySelector('.winners');
    const hasWinner = $winner.innerText !== 'ACUMULOU';

    const $lotteryAmmount = document.querySelector('.resultHead > .alignCenterValor');
    const ammount = $lotteryAmmount.innerText;

    return {
      name: `CONCURSO ${formattedInfos[0]}`,
      date: formattedInfos[1],
      hasWinner,
      prize: hasWinner ? '' : ammount,
      results,
    };
  });
}

// Main function to run the scraping process
async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(process.env.PAGE_URL);

  const content = await scrapeLotteryData(page);

  const jsonData = JSON.stringify(content);
  fs.writeFileSync(`${__dirname}/contest.json`, jsonData);

  console.log('success scraping');

  await browser.close();
}

main();
