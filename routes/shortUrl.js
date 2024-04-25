const express = require('express');
const { madeShortURL, redirectURL, getAnalytics } = require('../controllers/shortUrl.controller');
const router = express.Router();

router.post("/",madeShortURL)
router.get("/:id",redirectURL)
router.get("/all/analytic",getAnalytics)

module.exports = router