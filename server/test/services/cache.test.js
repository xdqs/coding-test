'use strict';

const assert = require('assert');
const cacheService = require('../../services/cache');

describe('cache service', () => {
  after(() => {
    cacheService.client.disconnect();
  })
  it('The cache should be set successfully', async() => {
    await cacheService.setJson('testKey', { test: 1 });
    const cacheData = await cacheService.getJson('testKey');
    assert(cacheData instanceof Object);
    assert.strictEqual(cacheData.test, 1);
  });

  it('The cache should be delete successfully', async() => {
    await cacheService.del('testKey');
    const cacheData = await cacheService.getJson('testKey');
    assert(cacheData === null);
  });
})