const express = require("express");
const router = express.Router();
const { getResponses } = require('../controllers/formController');

router.get('/:formId/filteredResponses', getResponses);

module.exports = router;
