'use strict';

const Redis = require('ioredis');
const redisOptions = require('../libs/env').redisOptions;
const logger = require('../libs/logger');

const client = new Redis(redisOptions);

client.once('connect', () => {
  logger.info('========= redis connected ==========');
})
client.on('error', err => {
  logger.error(err);
})

module.exports = {
  getJson,
  setJson,
  del,
  client,
};

/**
 * get json cache data
 * @param {string} key key
 * @returns 
 */
async function getJson(key) {
  const value = await client.get(key);
  if (!value) {
    return null;
  }
  try {
    return JSON.parse(value);
  } catch (error) {
    logger.error(error);
  }
  return null;
}

/**
 * convert data to json before set to cache
 * @param {string} key key
 * @param {object} value value
 * @param {number} expire expires, in seconds
 * @returns 
 */
async function setJson(key, value, expire = 86400) {
  return client.set(key, JSON.stringify(value), 'ex', expire)
}

/**
 * delete cache data
 * @param {string} key key
 * @returns 
 */
async function del(key) {
  return client.del(key);
}