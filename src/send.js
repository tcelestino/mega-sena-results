/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const nodemailer = require('nodemailer');

require('dotenv').config();

const CONTEST_FILE = `${__dirname}/contest.json`;

function showPrize({ hasWinner, prize }) {
  if (hasWinner) return '';

  return `<h2>Valor prêmio: R$ ${prize}</h2>`;
}

function send() {
  try {
    const data = fs.readFileSync(CONTEST_FILE, 'utf-8');
    const json = JSON.parse(data);

    let transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let results = '';
    let resultsLength = json.results.length;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < resultsLength; i++) {
      results += `${json.results[i]} `;
    }

    const message = {
      from: 'mega_sena_results@gmail.com',
      to: `${process.env.EMAIL_USER}`,
      subject: `Resultado Mega Sena: ${json.name} - ${json.date}`,
      html: `
        <h2>Números sorteados: ${results}</h2>
        <h2>Houve ganhador: ${json.hasWinner ? 'Sim' : 'Não'}</h2>
        ${showPrize(json)}`,
    };

    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Sending successs', info.messageId);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

send();
