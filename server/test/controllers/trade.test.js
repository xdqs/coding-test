'use strict';

const assert = require('assert');
const supertest = require('supertest');
const app = require('../../app');

// test port
const port = 3031;

describe('GET /api/txs/:a', () => {
  let server;
  let request;
  before(() => {
    server = app.listen(port);
    request = supertest(server);
  });
  after(() => {
    server.close()
  });
  it('should return code 0', async () => {
    return request
      .get('/api/txs/0xeb2a81e229b68c1c22b6683275c00945f9872d90')
      .expect(200)
      .expect(res => {
        const body = res.body;
        assert(body.code === 0);
        assert(typeof body.message === 'string');
        assert(body.data instanceof Object);
        const rows = body.data.rows;
        assert(Array.isArray(rows))
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
      });
  });

  it('wrong address should return empty list', async () => {
    return request
      .get('/api/txs/test')
      .expect(200)
      .expect(res => {
        const body = res.body;
        assert(body.code === 0);
        assert(body.data instanceof Object);
        assert(Array.isArray(body.data.rows));
        assert(body.data.rows.length === 0);
      });
  });

  it('bad parameter should return code 1', async () => {
    await request
      .get('/api/txs/0xeb2a81e229b68c1c22b6683275c00945f9872d90?p=0')
      .expect(200)
      .expect(res => {
        const body = res.body;
        assert(body.code === 1);
        assert(body.message === '参数错误');
      });
    await request
      .get('/api/txs/0xeb2a81e229b68c1c22b6683275c00945f9872d90?ps=5.5')
      .expect(200)
      .expect(res => {
        const body = res.body;
        assert(body.code === 1);
        assert(body.message === '参数错误');
      });
  }).timeout(10000);
});
