const Responses = require('../../common/API_Responses');
const Dynamo = require('../../common/Dynamo');
import { v4 as uuid } from 'uuid';

const tableName = process.env.tableName;

exports.handler = async (event) => {
  console.log('event', event);
  if (event.httpMethod !== 'POST') {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
    );
  }

  const product = JSON.parse(event.body);
  product.ID = uuid();

  const newProduct = await Dynamo.write(product, tableName).catch((err) => {
    console.error('Error in writing with dynamo', err);
    return null;
  });

  if (!newProduct) {
    return Responses._400({ message: 'ID not found in the database' });
  }

  return Responses._200({ newProduct });
};
