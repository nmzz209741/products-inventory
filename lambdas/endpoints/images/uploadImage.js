/**
 * @file Handles the image upload to an S3 bucket using a POST request.
 * @module ImageUpload
 */
import Responses from '../../common/API_Responses';
import * as fileType from 'file-type';
import { v4 as uuid } from 'uuid';
import S3 from '../../common/S3'

const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/jpg'];

/**
 * Handles the POST request to upload an image to an S3 bucket.
 *
 * @param {Object} event - The event object representing the HTTP request.
 * @returns {Object} - The response object containing the HTTP status code and message.
 * @throws {Error} - Throws an error if the HTTP method is not POST or if there is an error during upload.
 */
exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    if (!body || !body.image || !body.mime) {
      return Responses._400({
        message: 'Incorrect body on request for image upload',
      });
    }

    if (!ALLOWED_MIMES.includes(body.mime)) {
      return Responses._400({
        message: 'Unsupported mime type',
      });
    }

    let imageData = body.image;
    if (body.image.substr(0, 7) === 'base64,') {
      imageData = body.image.substr(7, body.image.length);
    }

    const buffer = Buffer.from(imageData, 'base64');
    const fileInfo = await fileType.fileTypeFromBuffer(buffer);
    const detectedExt = fileInfo.ext;
    const detectedMime = fileInfo.mime;

    if (detectedMime !== body.mime) {
      return Responses._400({ message: 'Mime types do not match' });
    }

    const name = uuid();
    const key = `uploads/${name}.${detectedExt}`;

    console.log(`Writing image ${key} to bucket`);
    await S3.write(buffer, key, process.env.imageUploadBucket, body.mime);
    const url = `https://${process.env.imageUploadBucket}.s3.${process.env.region}.amazonaws.com/${key}`;

    return Responses._200({
      imageURL: url,
    });
  } catch (error) {
    console.error('error', error);
    return Responses._500({message: 'Image upload failure'});
  }
};
