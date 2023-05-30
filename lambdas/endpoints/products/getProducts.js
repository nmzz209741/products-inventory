const Responses = require('../../common/API_Responses');
const Dynamo = require('../../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async (event) => {
  console.log('event', event);
  if (event.httpMethod !== 'GET') {
    throw new Error(`getProducts can only accept GET method, you tried: ${event.httpMethod}`);
  }
  
  let page = parseInt(event.queryStringParameters?.page);
  let limit = parseInt(event.queryStringParameters?.limit);

  if (!page || !limit) {
    return Responses._400({ message: 'Missing the page and limit parameters from the query string' });
  }

  const result = await Dynamo.getAll(tableName, page, limit).catch((err) => {
    console.error('Error in Dynamo GET', err);
    return null;
  });

  if (!result) {
    return Responses._400({ message: 'Error fetching data from the database' });
  }

  return Responses._200({ products: result.items, lastEvaluatedKey: result.lastEvaluatedKey });
};
