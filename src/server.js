const http = require('node:http');
const { createApp } = require('./app');

const PORT = Number(process.env.PORT || 3000);
const server = http.createServer(createApp());

server.listen(PORT, () => {
  console.log(`RAM Commerce API listening on port ${PORT}`);
});
