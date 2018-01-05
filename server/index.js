const Server = require('./server');

const server = new Server();

server.publish(process.argv.slice(2).join(' ') || 'Hello!');