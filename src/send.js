const fs = require('fs');
const nodemailer = require('nodemailer');
require('dotenv').config();

const CONTEST_FILE = `${__dirname}/contest.json`;

// Function to display the prize amount if there is no winner
function showPrize({ hasWinner, prize }) {
  if (hasWinner) return '';
  return `<h2>Valor prêmio: R$ ${prize}</h2>`;
}

// Function to read contest data from the JSON file
function readContestData() {
  const data = fs.readFileSync(CONTEST_FILE, 'utf-8');
  return JSON.parse(data);
}

// Function to create the email transporter
function createTransporter() {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

// Function to format the lottery results
function formatResults(results) {
  return results.join(' ');
}

// Function to create the email message
function createMessage(json, results) {
  return {
    from: process.env.EMAIL_FROM,
    to: `${process.env.EMAIL_USER}`,
    subject: `Resultado Mega Sena: ${json.name} - ${json.date}`,
    html: `
      <h2>Números sorteados: ${results}</h2>
      <h2>Houve ganhador: ${json.hasWinner ? 'Sim' : 'Não'}</h2>
      ${showPrize(json)}`,
  };
}

// Function to send the email
function sendEmail(transporter, message) {
  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Sending success', info.messageId);
    }
  });
}

// Main function to send the lottery results email
function send() {
  try {
    const json = readContestData();
    const transporter = createTransporter();
    const results = formatResults(json.results);
    const message = createMessage(json, results);
    sendEmail(transporter, message);
  } catch (error) {
    console.error(error);
  }
}

send();
