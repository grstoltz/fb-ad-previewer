const aws = require('aws-sdk');
const { Readable } = require('stream');
const path = require('path');
const fs = require('fs');
const d3 = require('d3-dsv');
const webshot = require('webshot');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-west-2'
});

const s3 = new aws.S3();

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function uploadReadableStream(stream, awsKey) {
  const params = { Bucket: process.env.S3_BUCKET, Key: awsKey, Body: stream };
  const result = await s3
    .upload(params)
    .promise()
    .then(data => data)
    .catch(error => error);
  return result;
}

async function upload(readableStream, key) {
  const readable = readableStream;
  const results = await uploadReadableStream(readable, key);
  return results;
}

const captureScreenshot = (url, id) =>
  new Promise((resolve, reject) => {
    const options = {
      windowSelector: {
        width: 1920,
        height: 1000
      },
      renderDelay: 1000,
      captureSelector: '#stream_pagelet',
      errorIfStatusIsNot200: true,
      customCSS: `#u_0_c {
        display: none;
      }`,
      timeout: 30 * 1000
    };

    webshot(url, options, async (err, stream) => {
      if (err) return err;
      const readableStream = new Readable().wrap(stream);
      const result = await upload(readableStream, `${id}.png`);
      resolve(result);
    });
  });

const processArray = async arr => {
  const date = Date.now();
  await asyncForEach(arr, async element => {
    const img = await captureScreenshot(
      element.Permalink,
      `${element['Ad ID']}-${date}`
    );
    console.log(img);
    element.imgPath = img.Location; // eslint-disable-line
  });
  return arr;
};

const parseTSV = async str => {
  const parsedTSV = await d3.tsvParse(str);
  const processedArray = await processArray(parsedTSV);
  return processedArray;
};

exports.parse = async (req, res, next) => {
  const strBuffer = req.files[0].buffer.toString('utf-16le');
  const processedArray = await parseTSV(strBuffer);
  res.app.locals.data = processedArray;
  next();
};
