# Overview
Node.ja based application that implements client-server interaction on top of RabbitMQ.  
The server pushes message to the queue, client pull the message and sends it via email to the recipient.

# Prerequisites
* RabbitMQ v3.* or higher
* node.js v6.* or higher

# Install
* `git clone https://github.com/asaulyak/message-delivery`
* `cd message-delivery`
* `npm install`

# Run
The application can be started via npm:
* Client: `npm run client`
* Server: `npm run server "<Message to be sent>"`

Or directly via node:
* Client: `node client`
* Server: `node server "<Message to be sent>"`

# Usage
To make use of the application both client and server should be run.  
  
Client listens for the new messages in a queue, gets the new one after it's been added by the server and sends email to the recipient.  
The recipient can be specified in the configuration file.  
Server accepts one parameter - the message to be sent to the recipient.  
By default server sends "Hello!" if no message is specified.  
  
Run client in the first terminal window. It starts listening for the new messages.  
  
Open the second terminal window and run the server. It sends the message and exits.  
You should run server several times if you need to send multiple messages.
