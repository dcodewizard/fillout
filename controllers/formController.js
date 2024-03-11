const asyncHandler = require('express-async-handler');
const dotenv = require("dotenv").config();
const formService = require('../services/formService');


const getResponses = asyncHandler(async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const formId = req.params.formId;
    const filteredResponses = await formService.getFilteredResponses(formId, apiKey, req.query);
    res.json(filteredResponses);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = { getResponses };
