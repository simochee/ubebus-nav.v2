const express = require('express');
const router = express.Router();

/* バスなび！のSPA */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
