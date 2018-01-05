const amqp = require('amqplib');
const config = require('../config');
const transport = require('./transport')[config.transport.defaultTransport];

amqp.connect(config.rabbitMQ.connection)
  .then(connection => {
    process.once('SIGINT', () => {
      connection.close();
    });

    return connection.createChannel()
      .then(ch => ch.assertQueue(config.rabbitMQ.queue, {durable: true})
        .then(() => {
          ch.prefetch(1);
          ch.consume(config.rabbitMQ.queue, worker, {noAck: true});
          console.log(' [*] Waiting for messages. To exit press CTRL+C');

          function doWork(msg) {
            const body = msg.content.toString();
            console.log(' [x] Received \'%s\'', body);
            const secs = body.split('.').length - 1;
            setTimeout(function () {
              console.log(' [x] Done');
              ch.ack(msg);
            }, secs * 1000);
          }

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
    subject: 'Hi!'
  })
    .catch(error => {
      console.log('Error occurred', error);
    });
};