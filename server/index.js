const app = require('./app');
const { name, version } = require('../package.json');
const logger = require('./libs/logger');

const port = parseInt(process.env.BLOCKLET_PORT || process.env.APP_PORT, 10) || 3030;

app.listen(port, (err) => {
  if (err) throw err;
  logger.info(`> ${name} v${version} ready on ${port}`);
});