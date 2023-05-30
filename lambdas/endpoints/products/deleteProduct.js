const Responses = require('../../common/API_Responses');
const Dynamo = require('../../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async (event) => {
  if (event.httpMethod !== 'DELETE') {
    throw new Error(`deleteMethod only accepts DELETE method, you tried: ${event.httpMethod}`);
  }

  console.log('event', event);

  if (!event?.pathParameters?.ID) {
    return Responses._400({ message: 'Missing the ID from the path' });
  }

  let ID = event.pathParameters.ID;

  try {
    await Dynamo.delete(ID, tableName);
    return Responses._200({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error in Dynamo DELETE', error);
    return Responses._400({ message: 'Error deleting the item' });
  }
};