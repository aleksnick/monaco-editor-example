const superstatic = require('superstatic').server;

console.log('Use a static server in production instead...');
console.log();

const DEFAULT_PORT = process.env.PORT || 8082;

const app = superstatic({ port: DEFAULT_PORT });

app.listen(() => {
  console.log(`Listening on http://localhost:${DEFAULT_PORT}`);
});
