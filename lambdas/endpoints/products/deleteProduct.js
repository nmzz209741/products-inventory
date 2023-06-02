/**
 * @file Deletes a product using a DELETE request.
 * @module DeleteProduct
 */
const Responses = require('../../common/API_Responses');
const Dynamo = require('../../common/Dynamo');
const S3 = require('../../common/S3');

const tableName = process.env.tableName;

/**
 * Handles the DELETE request to delete an item.
 *
 * @param {Object} event - The event object representing the HTTP request.
 * @returns {Object} - The response object containing the HTTP status code and message. This function may return one of the following status codes:
 *   - 200: The product was successfully deleted. The response body will contain a deletion successful message.
 *   - 400: There was a client error, such as an incorrect HTTP method being used or missing parameters in the request body. The response body will contain a message detailing the error.
 *   - 500: There was a server error when attempting to delete the product from the database/ deleting the image for the product from S3 bucket. The response body will contain a generic error message.
 */
exports.handler = async (event) => {
  if (event.httpMethod !== 'DELETE') {
    return Responses._400({
      message: `deleteMethod only accepts DELETE method, you tried: ${event.httpMethod}`,
    });
  }
  console.log('Event received for DELETE', event);
  // Validate params
  if (!event?.pathParameters?.ID) {
    return Responses._400({
      message: 'Missing the ID from the path parameters',
    });
  }

  let ID = event.pathParameters.ID;

  try {
    const product = await Dynamo.get(ID, tableName);
    // Delete the S3 image if it contains image uploaded
    if (product.imageUrl.includes(process.env.imageUploadBucket)) {
      await S3.delete(product.imageUrl);
    }
    // Delete the record from DynamoDB
    await Dynamo.delete(ID, tableName);
    return Responses._200({
      message: `Item with ID:${ID} deleted successfully`,
    });
  } catch (error) {
    console.error(`Error deleting the item with ID:${ID}: ${error}`);
    return Responses._500({
      message: `Internal Server Error deleting the item`,
    });
  }
};
