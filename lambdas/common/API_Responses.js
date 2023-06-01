/**
 * @file Manages HTTP responses for API handlers.
 * @module API_Responses
 */

/**
 * Creates a base HTTP response.
 *
 * @function
 * @param {Object} [data={}] - The data to be sent in the response body.
 * @param {number} [statusCode=200] - The HTTP status code of the response.
 * @returns {Object} The HTTP response object.
 */
const baseResponse = (data = {}, statusCode = 200) => ({
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Origin': '*',
  },
  statusCode,
  body: JSON.stringify(data),
});

/**
 * @namespace
 */
const API_Responses = {
  /**
   * Creates a HTTP 200 (OK) response.
   *
   * @param {Object} [data={}] - The data to be sent in the response body.
   * @returns {Object} The HTTP response object.
   */
  _200(data) {
    return baseResponse(data, 200);
  },

  /**
   * Creates a HTTP 400 (Bad Request) response.
   *
   * @param {Object} [data={}] - The data to be sent in the response body.
   * @returns {Object} The HTTP response object.
   */
  _400(data) {
    return baseResponse(data, 400);
  },

  /**
   * Creates a HTTP 500 (Internal Server Error) response.
   *
   * @param {Object} [data={}] - The data to be sent in the response body.
   * @returns {Object} The HTTP response object.
   */
  _500(data) {
    return baseResponse(data, 500);
  },
};

module.exports = API_Responses;
