const puppeteer = require('puppeteer');
const fs = require('fs');
const { formatLotteryInfo, extractResults, scrapeLotteryData } = require('../src/index');

jest.mock('puppeteer');
jest.mock('fs');

describe('formatLotteryInfo', () => {
  it('should format lottery information correctly', () => {
    const input = [' Concurso 1234 ', ' Data: 01/01/2022 ', ' ÁCUMULOU '];
    const expectedOutput = ['1234', '01/01/2022'];
    const result = formatLotteryInfo(input);
    expect(result).toEqual(expectedOutput);
  });
});

describe('extractResults', () => {
  it('should extract lottery results correctly', () => {
    const input = [{ innerText: '1' }, { innerText: '2' }, { innerText: '3' }];
    const expectedOutput = ['1', '2', '3'];
    const result = extractResults(input);
    expect(result).toEqual(expectedOutput);
  });
});

describe('scrapeLotteryData', () => {
  it('should scrape lottery data correctly', async () => {
    const page = {
      evaluate: jest.fn().mockImplementation((fn) => {
        const $lotteryDetails = { innerText: ' Concurso 1234 | Data: 01/01/2022 ' };
        const $lotteryResults = [{ innerText: '1' }, { innerText: '2' }, { innerText: '3' }];
        const $winner = { innerText: 'ACUMULOU' };
        const $lotteryAmmount = { innerText: 'R$ 1.000.000,00' };

        return fn.call({
          document: {
            querySelector: (selector) => {
              if (selector === '.lottery-info > span') return $lotteryDetails;
              if (selector === '.winners') return $winner;
              if (selector === '.resultHead > .alignCenterValor') return $lotteryAmmount;
            },
            querySelectorAll: (selector) => {
              if (selector === '.lt-result.no-margin > div') return $lotteryResults;
            },
          },
        });
      }),
    };

    const expectedOutput = {
      name: 'CONCURSO 1234',
      date: '01/01/2022',
      hasWinner: false,
      prize: 'R$ 1.000.000,00',
      results: ['1', '2', '3'],
    };

    const result = await scrapeLotteryData(page);
    expect(result).toEqual(expectedOutput);
  });
});

describe('main', () => {
  it('should run the scraping process and save data to file', async () => {
    const browser = { close: jest.fn() };
    const page = { goto: jest.fn(), evaluate: jest.fn() };
    puppeteer.launch.mockResolvedValue(browser);
    browser.newPage = jest.fn().mockResolvedValue(page);

    const mockData = {
      name: 'CONCURSO 1234',
      date: '01/01/2022',
      hasWinner: false,
      prize: 'R$ 1.000.000,00',
      results: ['1', '2', '3'],
    };
    page.evaluate.mockResolvedValue(mockData);

    const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync');

    await require('../src/index');

    expect(puppeteer.launch).toHaveBeenCalled();
    expect(page.goto).toHaveBeenCalledWith(process.env.PAGE_URL);
    expect(writeFileSyncSpy).toHaveBeenCalledWith(`${__dirname}/contest.json`, JSON.stringify(mockData));
    expect(browser.close).toHaveBeenCalled();
  });
});
