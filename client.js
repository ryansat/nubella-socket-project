const net = require('net');
const JSONStream = require('JSONStream');

const client = net.createConnection('/var/run/dev-test/sock', () => {
  console.log('Connected to server');
  client.write(
    JSON.stringify({
      id: 42,
      method: 'echo',
      params: {
        message: 'Hello',
      },
    }) + '\n'
  );
});

const parser = JSONStream.parse();
client.pipe(parser);

parser.on('data', (data) => {
  console.log(data);
  client.end();
});

client.on('end', () => {
  console.log('Disconnected from server');
});
