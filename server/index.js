const amqp = require('amqplib');
const config = require('../config');

amqp.connect(config.rabbitMQ.host)
  .then(connection => {
    return connection.createChannel()
      .then(channel => channel.assertQueue(config.rabbitMQ.queue, {durable: true})
        .then(() => channel))
      .then(channel => {
        const msg = process.argv.slice(2).join(' ') || 'Hello World!';
        channel.sendToQueue(config.rabbitMQ.queue, Buffer.from(msg), {
          deliveryMode: true
        });
        console.log(' [x] Sent \'%s\'', msg);
        return channel.close();
      })
      .finally(() => {
        connection.close();
      })
  })
  .catch(console.warn);