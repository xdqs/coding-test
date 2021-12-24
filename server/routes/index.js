const router = require('express').Router();
const tradeController = require('../controllers/trade');

router.use('/env', (req, res) => res.json({}));
router.get('/txs/:a', tradeController.getTradeInfo)

module.exports = router;
