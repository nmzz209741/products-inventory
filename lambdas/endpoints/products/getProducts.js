/**
 * @file Fetches all products using a GET request.
 * @module GetProducts
 */
const Responses = require('../../common/API_Responses');
const Dynamo = require('../../common/Dynamo');

const tableName = process.env.tableName;

/**

Handles the AWS Lambda function for fetching all products using a GET request.
@param {Object} event - The event object containing request details.
 *   - 200: The products were successfully fetched. The response body will contain a list of all products.
 *   - 400: There was a client error, such as an incorrect HTTP method being used or missing parameters in the request body. The response body will contain a message detailing the error.
 *   - 500: There was a server error when attempting to fetch all products. The response body will contain a generic error message.
 */

exports.handler = async (event) => {
  console.log('event', event);
  if (event.httpMethod !== 'GET') {
    return Responses._400({
      message: `getProducts can only accept GET method, you tried: ${event.httpMethod}`,
    });
  }

  let page = parseInt(event.queryStringParameters?.page);
  let limit = parseInt(event.queryStringParameters?.limit);

  if (!page || !limit) {
    return Responses._400({
      message: 'Missing the page and limit parameters from the query string',
    });
  }

  try {
    const result = await Dynamo.getAll(tableName, page, limit);
    return Responses._200({
      products: result.items,
      lastEvaluatedKey: result.lastEvaluatedKey,
    });
  } catch (err) {
    console.error('Error in Dynamo GET', err);
    return Responses._500({
      message: 'Error fetching all data from the database',
    });
  }
};
