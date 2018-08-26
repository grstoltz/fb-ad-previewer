const aws = require('aws-sdk');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-west-2'
});

const s3 = new aws.S3();

exports.deleteInstanceImages = async fileArr => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Delete: {
      Objects: fileArr
    }
  };

  const result = await s3.deleteObjects(params, (err, data) => {
    if (err) console.log(err, err.stack);
    console.log(data);
    return data;
    // an error occurred
  });

  return result;
};
