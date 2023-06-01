/**
 * @file Fetches a product using a GET request.
 * @module GetProduct
 */
const Responses = require('../../common/API_Responses');
const Dynamo = require('../../common/Dynamo');

const tableName = process.env.tableName;

/**
Lambda function handler for getting a product by ID.
@param {Object} event - The event object containing request details.
 *   - 200: The product was successfully fetched. The response body will contain the fetched product data.
 *   - 400: There was a client error, such as an incorrect HTTP method being used or missing parameters in the request body. The response body will contain a message detailing the error.
 *   - 500: There was a server error when attempting to fetch the product from the database. The response body will contain a generic error message.
*/
exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return Responses._400({
      message: `getMethod only accept GET method, you tried: ${event.httpMethod}`,
    });
  }

  console.log('event', event);

  if (!event?.pathParameters?.ID) {
    return Responses._400({ message: 'Missing the ID from the path' });
  }

  let ID = event.pathParameters.ID;

  try {
    const product = await Dynamo.get(ID, tableName);
    return Responses._200({ product });
  } catch (err) {
    console.error('Error in Dynamo GET', err);
    if (err.message === 'Data reference error') {
      return Responses._400({ message: 'ID not found in the database' });
    }
    return Responses._500({ message: 'Internal Server Error' });
  }
};
