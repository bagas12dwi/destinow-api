let express = require('express');
let router = express.Router();

let tourServices = require('../services/tourServices');

router.get('/tour', tourServices.index);
router.post('/tour/store', tourServices.store);

module.exports = router;