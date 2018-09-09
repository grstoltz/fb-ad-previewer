const cloudinary = require('cloudinary');
const uuidv1 = require('uuid/v1');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.upload = (fileBuffer, instanceId) =>
  new Promise((resolve, reject) => {
    const uuid = uuidv1();
    cloudinary.v2.uploader
      .upload_stream(
        {
          use_filename: true,
          public_id: `${uuid}`,
          tags: instanceId
        },
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      )
      .end(fileBuffer);
  });

exports.deleteImages = instanceId => {
  const instance = instanceId;
  return new Promise((resolve, reject) => {
    cloudinary.v2.api.delete_resources_by_tag(instance, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};
