require('dotenv').config();

module.exports = {
  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  PAGE_URL: process.env.PAGE_URL,
};
