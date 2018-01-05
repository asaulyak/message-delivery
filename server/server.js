const RxAmqpLib = require('rx-amqplib');
const config = require('../config');

class Server {
  constructor() {
    this.connection = this.connect();
  }

  connect() {
    return RxAmqpLib.newConnection(config.rabbitMQ.host)
  }

  publish(message) {
    this.connection
      .flatMap(connection => connection
        .createChannel()
        .flatMap(channel => channel.assertQueue(config.rabbitMQ.queue, {durable: true}))
        .doOnNext(assertQueueReply => {
          assertQueueReply.channel.sendToQueue(config.rabbitMQ.queue, Buffer.from(message), {deliveryMode: true});
          console.log(` [x] Sent ${message}`);
        })
        .flatMap(reply => reply.channel.close())
        .flatMap(() => connection.close())
      )
      .subscribe();
  }
}

module.exports = Server;