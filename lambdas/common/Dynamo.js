/**
 * @file This module provides an interface to AWS DynamoDB, allowing the user to get, write, delete, and fetch all objects in a table.
 * @module Dynamo
 */

const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
  /**
   * Retrieve an item from a DynamoDB table.
   *
   * @param {string} ID - The ID of the item.
   * @param {string} TableName - The name of the table.
   * @throws {Error} - Throws an error if unable to retrieve the item.
   * @returns {Promise<Object>} - The retrieved item.
   */
  async get(ID, TableName) {
    try {
      const params = {
        TableName,
        Key: {
          ID,
        },
      };

      const data = await documentClient.get(params).promise();

      if (!data?.Item) {
        throw Error('Data reference error');
      }

      console.log(data);
      return data.Item;
    } catch (err) {
      console.error(`Error fetching data from ${TableName} for ID ${ID}`, err);
      throw err;
    }
  },

  /**
   * Fetch all items from a DynamoDB table with pagination.
   *
   * @param {string} TableName - The name of the table.
   * @param {number} page - The page number to fetch.
   * @param {number} limit - The number of items per page.
   * @throws {Error} - Throws an error if unable to fetch the items.
   * @returns {Promise<Object>} - The retrieved items and the last evaluated key.
   */
  async getAll(TableName, page, limit) {
    try {
      const params = {
        TableName,
        Limit: limit,
      };

      if (page && page > 1) {
        params.ExclusiveStartKey = {
          primary_key: data.LastEvaluatedKey.primary_key,
        };
      }

      const data = await documentClient.scan(params).promise();

      if (!data) {
        throw new Error(
          `There was an error fetching the data from ${TableName}`
        );
      }

      const items = data.Items;
      console.log(items);

      return {
        items,
        lastEvaluatedKey: data.LastEvaluatedKey, // The last evaluated key of the current page
      };
    } catch (err) {
      console.error(`Error fetching all data from ${TableName}`, err);
      throw err;
    }
  },

  /**
   * Write an item to a DynamoDB table.
   *
   * @param {Object} data - The data to be written.
   * @param {string} TableName - The name of the table.
   * @throws {Error} - Throws an error if unable to write the item.
   * @returns {Promise<Object>} - The written data.
   */
  async write(data, TableName) {
    try {
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
          `There was an error inserting ID of ${data.ID} in table ${TableName}`
        );
      }

      return data;
    } catch (err) {
      console.error(`Error writing data to ${TableName}`, err);
      throw err;
    }
  },

  /**
   * Delete an item from a DynamoDB table.
   *
   * @param {string} ID - The ID of the item.
   * @param {string} TableName - The name of the table.
   * @throws {Error} - Throws an error if unable to delete the item.
   * @returns {Promise<boolean|string>} - Returns true when the deletion is successful or a string when the item doesn't exist.
   */
  async delete(ID, TableName) {
    try {
      // First, attempt to get the item
      const item = await this.get(ID, TableName);

      // If the item doesn't exist, return a message
      if (!item) {
        throw new Error(`No item with ID ${ID} exists in table ${TableName}`);
      }

      // If the item does exist, delete it
      const params = {
        TableName,
        Key: {
          ID,
        },
      };

      await documentClient.delete(params).promise();
      return true;
    } catch (err) {
      console.error(`Error deleting data from ${TableName} for ID ${ID}`, err);
      throw err;
    }
  },

};

module.exports = Dynamo;
