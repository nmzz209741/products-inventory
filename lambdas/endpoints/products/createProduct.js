/**
 * @file Creates a new product using a POST request.
 * @module CreateProduct
 */
const Responses = require('../../common/API_Responses');
const Dynamo = require('../../common/Dynamo');
import { v4 as uuid } from 'uuid';

const tableName = process.env.tableName;

/**
 * Handles the POST request to create a new product.
 *
 * @param {Object} event - The event object representing the HTTP request.
 * @returns {Object} - The response object containing the HTTP status code and message. This function may return one of the following status codes:
 *   - 200: The product was successfully created. The response body will contain the newly created product.
 *   - 400: There was a client error, such as an incorrect HTTP method being used or missing parameters in the request body. The response body will contain a message detailing the error.
 *   - 500: There was a server error when attempting to write the new product to the database. The response body will contain a generic error message.
 */
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return Responses._400({
      message: `RequestPost Method only accepts POST method, you tried: ${event.httpMethod} method.`,
    });
  }

  console.log('Event received for POST request:', event);
  const product = JSON.parse(event.body);
  // Validation of body
  if (
    !(
      product.name &&
      product.description &&
      product.imageUrl &&
      product.price
    )
  ) {
    return Responses._400({
      message: `Incomplete request parameters for: ${Object.keys(product)
        .filter((k) => !product[k])
        .join(', ')}`,
    });
  }

  product.ID = uuid();
  try {
    const newProduct = await Dynamo.write(product, tableName);
    return Responses._200({ newProduct });
  } catch (err) {
    console.error(
      `Error in writing product ${product.name} to dynamo ${tableName}`,
      err
    );
    return Responses._500({
      message: `Error while creating a new product in the database`,
    });
  }
};
