const Responses = require('../../common/API_Responses');
const Dynamo = require('../../common/Dynamo');

const tableName = process.env.tableName

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }

  console.log('event', event);
  
  if (!event?.pathParameters?.ID) {
    return Responses._400({ message: 'Missing the ID from the path' });
  }

  let ID = event.pathParameters.ID;

  const product = await Dynamo.get(ID, tableName).catch((err) => {
    console.error('Error in Dynamo GET', err);
    return null;
  });

  if (!product) {
    return Responses._400({ message: 'ID not found in the database' });
  }

  return Responses._200({ product });
};
