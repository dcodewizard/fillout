const axios = require('axios');
const {validate, applyFilters} = require('../common/validator')

const getFilteredResponses = async (formId, apiKey, query) => {
  try {
    validate(query);
    const queryParamsString = Object.keys(query)
      .map((key) => `${key}=${encodeURIComponent(query[key])}`)
      .join('&');

    const filters = query.filters ? JSON.parse(query.filters) : [];
    const apiUrl = `https://api.fillout.com/v1/api/forms/${formId}/submissions?${queryParamsString}&filters=${filters}`;

    const submissions = await axios.get(`${apiUrl}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const filteredResponses = applyFilters(submissions.data, filters);

    return {responses: filteredResponses, totalResponses: submissions.data.totalResponses, pageCount: submissions.data.pageCount };
  } catch (error) {
    throw error;
  }
};

module.exports = { getFilteredResponses };
