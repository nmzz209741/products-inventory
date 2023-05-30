const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
  async get(ID, TableName) {
    const params = {
      TableName,
      Key: {
        ID,
      },
    };

    const data = await documentClient.get(params).promise();

    if (!data || !data.Item) {
      throw Error(
        `There was an error fetching the data for ID of ${ID} from ${TableName}`
      );
    }

    console.log(data);

    return data.Item;
  },

  async getAll(tableName, page, limit) {
    const params = {
      TableName: tableName,
      Limit: limit,
    };
  
    if (page && page > 1) {
      params.ExclusiveStartKey = { 
        primary_key: data.LastEvaluatedKey.primary_key,
      };
    }
  
    const data = await documentClient.scan(params).promise();
  
    if (!data) {
      throw new Error(`There was an error fetching the data from ${tableName}`);
    }
  
    const items = data.Items;
    console.log(items);
  
    return {
      items,
      lastEvaluatedKey: data.LastEvaluatedKey, // The last evaluated key of the current page
    };
  },

  async write(data, TableName) {
    if (!data.ID) {
      throw Error('No ID in the data');
    }

    const params = {
      TableName,
      Item: data,
    };

    const res = await documentClient.put(params).promise();

    if (!res) {
      throw Error(
        `There was an error inserting ID od ${data.ID} in table ${TableName}`
      );
    }

    return data;
  },

  async delete(ID, TableName) {
    const params = {
      TableName,
      Key: {
        ID,
      },
    };

    const data = await documentClient.delete(params).promise();

    if (!data) {
      throw Error(`There was an error deleting the data for ID of ${ID} from ${TableName}`);
    }

    return true;
  },
};

module.exports = Dynamo;
