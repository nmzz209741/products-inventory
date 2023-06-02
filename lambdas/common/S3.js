/**
 * @file This module provides an interface to AWS S3, allowing the user to get, write, and delete objects in a bucket.
 * @module S3
 */

const AWS = require('aws-sdk');
const S3Client = new AWS.S3();

const S3 = {
  /**
   * Retrieve a file from an S3 bucket.
   *
   * @param {string} fileName - The key of the object in the bucket.
   * @param {string} bucket - The name of the bucket.
   * @throws {Error} - Throws an error if unable to retrieve the file.
   * @returns {Promise<Buffer|string>} - The retrieved file.
   */
  async get(fileName, bucket) {
    try {
      const params = {
        Bucket: bucket,
        Key: fileName,
      };

      const data = await S3Client.getObject(params).promise();
      if (fileName.endsWith('json')) {
        return data.Body.toString();
      }
      return data.Body;
    } catch (err) {
      console.error(`Error fetching file ${fileName} from ${bucket}`, err);
      throw Error(`Failed to get file ${fileName} from ${bucket}: ${err.message}`);
    }
  },

  /**
   * Write a file to an S3 bucket.
   *
   * @param {Buffer|string} data - The data to be written.
   * @param {string} fileName - The key to store the data under in the bucket.
   * @param {string} bucket - The name of the bucket.
   * @param {string} contentType - The type of the data being written.
   * @throws {Error} - Throws an error if unable to write the file.
   * @returns {Promise} - A promise that resolves when the data is written.
   */
  async write(data, fileName, bucket, contentType) {
    try {
      const params = {
        Bucket: bucket,
        Body: data,
        Key: fileName,
        ContentType: contentType,
        ACL: 'public-read',
      };

      const newData = await S3Client.putObject(params).promise();
      return newData;
    } catch (err) {
      console.error(`Error writing file ${fileName} to ${bucket}`, err);
      throw Error(`There was an error writing file in the S3 bucket: ${err.message}`);
    }
  },

  /**
   * Delete an object from an S3 bucket.
   *
   * @param {string} url - The URL of the object to be deleted.
   * @throws {Error} - Throws an error if unable to delete the object.
   * @returns {Promise} - A promise that resolves when the object is deleted.
   */
  async delete(url) {
    try {
      const parsedUrl = new URL(url);
      const bucket = parsedUrl.hostname.split('.')[0];
      const key = decodeURIComponent(parsedUrl.pathname.substr(1));

      const params = {
        Bucket: bucket,
        Key: key,
      };

      const deletedData = await S3Client.deleteObject(params).promise();
      return deletedData;
    } catch (err) {
      console.error(`Error deleting object ${url}`, err);
      throw Error(`There was an error deleting the object from the S3 bucket: ${err.message}`);
    }
  }
};

module.exports = S3;
