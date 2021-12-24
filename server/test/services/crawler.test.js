'use strict';

const assert = require('assert');
const crawlerService = require('../../services/crawler');

describe('crawler service', () => {
  it('Should crawl page data successfully', async() => {
    const rows = await crawlerService.getPageData('0xeb2a81e229b68c1c22b6683275c00945f9872d90');
    assert(Array.isArray(rows));
    assert(rows.length === 50);
    for (const row of rows) {
      assert(row instanceof Object);
      assert(typeof row.txnHash === 'string');
      assert(typeof row.method === 'string');
      assert(Number.isInteger(row.blockNumber));
      assert(typeof row.time === 'string');
      assert(typeof row.from === 'string');
      assert(typeof row.to === 'string');
      assert(typeof row.value === 'string');
      assert(typeof row.txnFee === 'number');
    }
  }).timeout(5000);

  it('Page and page size parameter should be useful', async() => {
    const rows1 = await crawlerService.getPageData('0xeb2a81e229b68c1c22b6683275c00945f9872d90', 1, 10);
    assert(Array.isArray(rows1));
    assert(rows1.length === 10);
    const rows2 = await crawlerService.getPageData('0xeb2a81e229b68c1c22b6683275c00945f9872d90', 2, 50);
    assert(Array.isArray(rows2));
    assert(rows2.length === 50);
    assert(rows1[0].txnHash !== rows2[0].txnHash);
  }).timeout(5000);

  it('Bad parameter should return empty array', async() => {
    const rows = await crawlerService.getPageData('test');
    assert(Array.isArray(rows));
    assert(rows.length === 0);
  }).timeout(5000);
});