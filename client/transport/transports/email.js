const nodemailer = require('nodemailer');
const config = require('../../../config');
const Rx = require('rxjs/Rx');

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

    return Rx.Observable.bindCallback(this.transporter.sendMail)
      .call(this.transporter, Object.assign({}, message, messageOptions));
  }
}


module.exports = new EmailTransport();