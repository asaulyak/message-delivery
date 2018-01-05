const amqp = require('amqplib');
const config = require('../config');
const transport = require('./transport')[config.transport.defaultTransport];

amqp.connect(config.rabbitMQ.host)
  .then(connection => {
    process.once('SIGINT', () => {
      connection.close();
    });

    return connection.createChannel()
      .then(ch => ch.assertQueue(config.rabbitMQ.queue, {durable: true})
        .then(() => {
          ch.prefetch(1);
          ch.consume(config.rabbitMQ.queue, worker, {noAck: true});
          console.log(` [*] Waiting for messages in ${config.rabbitMQ.queue}. To exit press CTRL+C`);

          return ch;
        }));
  })
  .catch(console.warn);

const worker = message => {
  const body = message.content.toString();
  console.log(' [x] Received \'%s\'', body);

  transport.send({
    to: 'jenya.asaulyak@gmail.com',
    text: body,
    subject: 'Hi !'
  })
    .then(data => console.log(' [x] Transporter response', data))
    .catch(error => console.log(' [x] Error occurred', error));
};