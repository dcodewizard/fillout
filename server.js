const express = require('express');
const axios = require('axios');
const formRoutes = require('./routes/formRoutes');

const app = express();
const port = 8080;

const filloutApiKey = 'sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912';

app.use(express.json());
app.use('/', formRoutes);

// const FilterClauseType = {
//   id: String,
//   condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than',
//   value: Number | String
// }

// const ResponseFiltersType = [FilterClauseType];

// app.get('/:formId/filteredResponses', async (req, res) => {
//   req.query
//   try {
//     const formId = req.params.formId;

//     // Extract filter parameters from query string
//     const filtersParam = req.query.filters;
//     console.log(filtersParam)
//     const filters = JSON.parse(filtersParam || '[]');
//     console.log(filters);

//     // Make a request to Fillout.com API to fetch form responses
//     const apiUrl = `https://api.fillout.com/v1/api/forms/${formId}/submissions?`;
//     console.log(apiUrl)
//     const response = await axios.get(apiUrl, {
//       headers: {
//         Authorization: `Bearer ${filloutApiKey}`,
//       },
//     });

//     const filteredResponses = applyFilters(response.data, filters);

//     const page = req.query.page || 1;
//     const pageSize = req.query.pageSize || 10;
//     const startIndex = (page - 1) * pageSize;
//     const endIndex = startIndex + pageSize;
//     const paginatedResponses = filteredResponses.slice(startIndex, endIndex);

//     res.json({
//       responses: paginatedResponses,
//       totalResponses: filteredResponses.length,
//       pageCount: Math.ceil(filteredResponses.length / pageSize),
//       currentPage: page,
//       pageSize: pageSize,
//     });
//   } catch (error) {
//     console.error('Error fetching filtered form responses:', error.message);
//     res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
//   }
// });


// // Function to apply filters to responses
// function applyFilters(response, filters) {
//   const allResponses = response.responses || [];

//  return allResponses.filter((response) => {

//     return filters.every((filter) => {
//       const question = response.questions.find((q) => q.id === filter.id);

//       if (question) {
//         switch (filter.condition) {
//           case 'equals':
//             return question.value === filter.value;
//           case 'does_not_equal':
//             return question.value !== filter.value;
//           case 'greater_than':
//             return new Date(question.value) > new Date(filter.value);
//           case 'less_than':
//             return new Date(question.value) < new Date(filter.value);
//           default:
//             return true;
//         }
//       } else {
//         return false;
//       }
//     });
//   });
// }

const serve = () =>
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });

  serve();
