const nodemailer = require('nodemailer');
const config = require('../../../config');

class EmailTransport {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: config.transport.email.service,
      auth: {
        type: 'OAuth2',
        user: config.transport.email.login,
        clientId: config.transport.email.clientId,
        clientSecret: config.transport.email.clientSecret,
        refreshToken: config.transport.email.refreshToken,
        accessToken: config.transport.email.accessToken
      }
    });
  }

  send(message) {
    const messageOptions = {
      from: config.transport.email.login,
      replyTo: config.transport.email.replyTo
    };

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(Object.assign({}, message, messageOptions), (error, data) => {
        if (error) {
          reject(error);
        }
        else {
          resolve(data);
        }
      });
    });
  }
}


module.exports = new EmailTransport();