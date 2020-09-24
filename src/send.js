/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const nodemailer = require('nodemailer');

require('dotenv').config();

const CONTEST_FILE = `${__dirname}/contest.json`;

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
      to: 'tcelestino@gmail.com',
      subject: `Mega Sena Resultado: ${json.name} - ${json.date}`,
      html: `
        <h2>Números sorteados: ${results}</h2>
        <h2>Houve ganhador: ${json.hasWinner ? 'Sim' : 'Não'}</h2>
        <h2>Valor prêmio: R$ ${json.prize}</h2>
      `,
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
