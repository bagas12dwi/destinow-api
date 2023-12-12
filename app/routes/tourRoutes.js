let express = require('express');
let router = express.Router();

let tourServices = require('../services/tourServices');
const multer = require('multer');
const imageFIlter = require('../middleware/imageFilter');
const upload = multer({dest: 'public/tmp', fileFilter: imageFIlter.imageFIlter});

router.get('/tour', tourServices.index);
router.get('/tour/:id', tourServices.detail);
router.post('/tour/store', upload.array('image', 10), tourServices.store);

module.exports = router;