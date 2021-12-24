const blockletRealDid = process.env.BLOCKLET_REAL_DID || '';
const blockletDid = process.env.BLOCKLET_DID || '';
const isComponent = blockletRealDid && blockletDid && blockletRealDid !== blockletDid;

const redisOptions = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  db: process.env.REDIS_DB || 0,
  password: process.env.REDIS_PASS || '',
}

module.exports = {
  chainId: process.env.CHAIN_ID || '',
  chainHost: process.env.CHAIN_HOST || '',
  appId: process.env.BLOCKLET_APP_ID || '',
  appName: process.env.APP_NAME || process.env.BLOCKLET_APP_NAME || '',
  appDescription: process.env.APP_DESCRIPTION || process.env.BLOCKLET_APP_DESCRIPTION || '',
  crawlerUrl: process.env.CRAWLER_URL || '',
  isComponent,
  redisOptions,
};
