'use strict';

const Joi = require('joi');
const crawlerService = require('../services/crawler');
const cacheService = require('../services/cache');
const cacheKeys = require('../constants/cache_keys').tradeInfo;

module.exports = {
  getTradeInfo,
};

const schema = Joi.object({
  a: Joi.string().trim().required(),
  ps: Joi.number().default(50).valid(10, 25, 50, 100),
  p: Joi.number().integer().default(1).min(1),
});

async function getTradeInfo(req, res) {
  // parameter validation
  const params = Object.assign({}, req.query, req.params);
  const { value, error } = schema.validate(params);
  if (error) {
    return res.json({
      code: 1,
      message: '参数错误',
      data: { error }
    })
  }

  const { a, p, ps } = value;
  const keyName = `${cacheKeys.keyName}:${a}:${ps}:${p}`;
  // get data from cache
  const cacheData = await cacheService.getJson(keyName);
  if (cacheData) {
    return res.json({
      code: 0,
      message: '成功',
      data: { rows: cacheData }
    });
  }

  // get data from crawler
  const rows = await crawlerService.getPageData(a, p, ps);
  cacheService.setJson(keyName, rows, cacheKeys.expire)

  return res.json({
    code: 0,
    message: '成功',
    data: { rows }
  });
}
 