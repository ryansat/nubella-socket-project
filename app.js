const net = require('net');
const JSONStream = require('JSONStream');

const server = net.createServer((client) => {
  console.log('Client connected');

  const parser = JSONStream.parse();
  client.pipe(parser);

  parser.on('data', (data) => {
    if (data.method === 'echo') {
      client.write(
        JSON.stringify({
          id: data.id,
          result: {
            message: data.params.message,
          },
        }) + '\n'
      );
    }
  });

  client.on('end', () => {
    console.log('Client disconnected');
  });
});

server.listen(process.argv[2], () => {
  console.log(`Server listening on socket ${process.argv[2]}`);
});
