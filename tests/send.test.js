const fs = require('fs');
const nodemailer = require('nodemailer');
const { readContestData, createTransporter, formatResults, createMessage, sendEmail } = require('../src/send');

jest.mock('fs');
jest.mock('nodemailer');

describe('readContestData', () => {
  it('should read contest data from JSON file', () => {
    const mockData = '{"name":"CONCURSO 1234","date":"01/01/2022","hasWinner":false,"prize":"R$ 1.000.000,00","results":["1","2","3"]}';
    fs.readFileSync.mockReturnValue(mockData);

    const result = readContestData();
    expect(result).toEqual(JSON.parse(mockData));
  });
});

describe('createTransporter', () => {
  it('should create a nodemailer transporter', () => {
    const mockTransporter = {};
    nodemailer.createTransport.mockReturnValue(mockTransporter);

    const result = createTransporter();
    expect(result).toBe(mockTransporter);
  });
});

describe('formatResults', () => {
  it('should format lottery results correctly', () => {
    const input = ['1', '2', '3'];
    const expectedOutput = '1 2 3';
    const result = formatResults(input);
    expect(result).toBe(expectedOutput);
  });
});

describe('createMessage', () => {
  it('should create an email message', () => {
    const json = {
      name: 'CONCURSO 1234',
      date: '01/01/2022',
      hasWinner: false,
      prize: 'R$ 1.000.000,00',
      results: ['1', '2', '3'],
    };
    const results = '1 2 3';

    const expectedOutput = {
      from: process.env.EMAIL_FROM,
      to: `${process.env.EMAIL_USER}`,
      subject: `Resultado Mega Sena: CONCURSO 1234 - 01/01/2022`,
      html: `
        <h2>Números sorteados: 1 2 3</h2>
        <h2>Houve ganhador: Não</h2>
        <h2>Valor prêmio: R$ R$ 1.000.000,00</h2>`,
    };

    const result = createMessage(json, results);
    expect(result).toEqual(expectedOutput);
  });
});

describe('sendEmail', () => {
  it('should send an email using the transporter', () => {
    const mockTransporter = {
      sendMail: jest.fn((message, callback) => callback(null, { messageId: '123' })),
    };

    const message = {
      from: process.env.EMAIL_FROM,
      to: `${process.env.EMAIL_USER}`,
      subject: 'Test Email',
      html: '<h2>Test Email</h2>',
    };

    sendEmail(mockTransporter, message);

    expect(mockTransporter.sendMail).toHaveBeenCalledWith(message, expect.any(Function));
  });

  it('should log an error if sending email fails', () => {
    const mockTransporter = {
      sendMail: jest.fn((message, callback) => callback(new Error('Failed to send email'))),
    };

    const message = {
      from: process.env.EMAIL_FROM,
      to: `${process.env.EMAIL_USER}`,
      subject: 'Test Email',
      html: '<h2>Test Email</h2>',
    };

    console.error = jest.fn();

    sendEmail(mockTransporter, message);

    expect(console.error).toHaveBeenCalledWith(new Error('Failed to send email'));
  });
});
