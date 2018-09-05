const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.upload = (fileBuffer, instanceId) =>
  new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream(
        {
          resource_type: 'raw',
          public_id: `${instanceId}`
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

exports.deleteImages = instanceId =>
  new Promise((resolve, reject) => {
    cloudinary.api.delete_resources_by_prefix(`${instanceId}/`, result => {
      resolve(result);
    });
  });
