'use strict';

const urllib = require('urllib');
const cheerio = require('cheerio');
const crawlerUrl = require('../libs/env').crawlerUrl;
const logger = require('../libs/logger');

module.exports = {
  getPageData
};

/**
 * crawl page data
 * @param {string} address 
 * @param {number} page 
 * @param {number} pageSize 
 * @returns {Promise<object[]>}
 */
async function getPageData(address, page = 1, pageSize = 50) {
  try {
    const result = await urllib.curl(crawlerUrl, {
      data: {
        a: address,
        ps: pageSize,
        p: page,
      },
      dataType: 'text',
      timeout: [5000, 30000],
    });
    if (result.status === 200) {
      return parseHtml(result.data);
    }
  } catch (error) {
    logger.error(error);
  }
  return [];
}

/**
 * parse html
 * @param {string} html html content
 * @returns 
 */
function parseHtml(html) {
  const $ = cheerio.load(html);
  const tableRows = $('#paywall_mask tbody tr');
  const result = [];
  for (const row of tableRows) {
    const columns = $('td', row);
    if (columns.length !== 12) {
      continue;
    }
    const txnHash = $('a', columns[1]).text();
    const method = $('span', columns[2]).text();
    const blockNumber = Number($('a', columns[3]).text());
    const time = $('span', columns[4]).text();
    const from = $('span', columns[6]).text();
    const to = $('a', columns[8]).text();
    const value = $(columns[9]).text();
    const txnFee = Number($('span', columns[10]).text());
    result.push({
      txnHash,
      method,
      blockNumber,
      time,
      from,
      to,
      value,
      txnFee,
    });
  }
  return result;
}