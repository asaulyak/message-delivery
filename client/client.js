const amqp = require('rx-amqplib');
const config = require('../config');
const transport = require('./transport')[config.transport.defaultTransport];

class Client {
  constructor() {
    this.connection = this.connect();
  }

  connect() {
    return amqp.newConnection(config.rabbitMQ.host);
  }

  close() {
    this.connection.close();
  }

  listen() {
    this.connection
      .flatMap(connection => connection.createChannel())
      .flatMap(channel => channel.assertQueue(config.rabbitMQ.queue, { durable: true }))
      .flatMap(reply => reply.channel.prefetch(1))
      .flatMap(reply => reply.channel.consume(config.rabbitMQ.queue, { noAck: false }))
      .doOnNext(message => console.log('[x] Received: %s', message.content.toString()))
      .delay(2000)
      .doOnNext(reply => reply.ack())
      .subscribe(() => console.log('[ ] Done'), console.error);
  }
}