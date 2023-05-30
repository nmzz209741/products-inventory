const AWS = require('aws-sdk');

const S3Client = new AWS.S3();

const S3 = {
  async get(fileName, bucket) {
    const params = {
      Bucket: bucket,
      Key: fileName,
    };

    let data = await S3Client.getObject(params).promise();
    if (!data) {
      throw Error(`Failed to get file ${fileName} from ${bucket}`);
    }

    if (fileName.slice(fileName.length - 4, fileName.length) == 'json') {
      data = data.Body.toString();
    }
    return data;
  },
  
  async write(data, fileName, bucket, contentType) {
    const params = {
      Bucket: bucket,
      Body: data,
      Key: fileName,
      ContentType: contentType,
      ACL: 'public-read',
    };

    const newData = await S3Client.putObject(params).promise();

    if (!newData) {
      throw Error(`There was an error writing file in the S3 bucket`);
    }

    return newData;
  },
};

module.exports = S3;
