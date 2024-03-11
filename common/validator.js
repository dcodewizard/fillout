function validate (query){
  const queryParams = ['limit', 'afterDate', 'beforeDate', 'offset', 'status', 'includeEditLink', 'sort', 'filters']
  const queryKeys = Object.keys(query)

  queryKeys.map(value => {
    if (!queryParams.includes(value)) {
      throw new Error(`Query ${value} not valid`);
    }
  })
}


function applyFilters(response, filters) {
  const allResponses = response.responses || [];
  return allResponses.reduce((filteredResponses, response) => {
    const matchingQuestions = response.questions.filter((question) =>
      filters.some((filter) => {
        if (question.id === filter.id) {
          switch (filter.condition) {
            case 'equals':
              return question.value === filter.value;
            case 'does_not_equal':
              return question.value !== filter.value;
            case 'greater_than':
              return new Date(question.value) > new Date(filter.value);
            case 'less_than':
              return new Date(question.value) < new Date(filter.value);
            default:
              return true;
          }
        } else {
          return false;
        }
      })
    );

    if (matchingQuestions.length > 0) {
      filteredResponses.push({
        submissionId: response.submissionId,
        submissionTime: response.submissionTime,
        lastUpdatedAt: response.lastUpdatedAt,
        questions: matchingQuestions,
      });
    }

    return filteredResponses;
  }, []);
}

module.exports = { validate, applyFilters }
