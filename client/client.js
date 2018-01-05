const RxAmqpLib = require('rx-amqplib');
const config = require('../config');
const transport = require('./transport')[config.transport.defaultTransport];

class Client {
  constructor() {
    this.connection = this.connect();
  }

  connect() {
    return RxAmqpLib.newConnection(config.rabbitMQ.host);
  }

  listen() {
    this.connection
      .doOnNext(() => console.log(` [*] Waiting for messages in ${config.rabbitMQ.queue}. To exit press CTRL+C`))
      .doOnNext(connection => process.once('SIGINT', () => {
        connection.close();
      }))
      .flatMap(connection => connection.createChannel())
      .flatMap(channel => channel.assertQueue(config.rabbitMQ.queue, {durable: true}))
      .flatMap(reply => reply.channel.prefetch(1))
      .flatMap(reply => reply.channel.consume(config.rabbitMQ.queue, {noAck: false}))
      .doOnNext(message => console.log(' [x] Received: %s', message.content.toString()))
      .doOnNext(message => transport.send({
        to: config.transport.email.recipient,
        subject: 'Hi !',
        text: message.content.toString()
      }).subscribe(response => console.log(' [x] Transporter response', response)))
      .doOnNext(reply => reply.ack())
      .subscribe();
  }
}

module.exports = Client;