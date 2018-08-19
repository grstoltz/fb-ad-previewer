const path = require('path');
const fs = require('fs');
const d3 = require('d3-dsv');
const webshot = require('webshot');

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const captureScreenshot = (url, id) => {
  return new Promise((resolve, reject) => {
    const options = {
      captureSelector: '#stream_pagelet',
      errorIfStatusIsNot200: true,
      timeout: 30 * 1000
    };

    const location = `${path.join(__dirname, '..', `public/${id}.png`)}`;

    return webshot(url, location, options, err => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(location);
    });
  });
};

const processArray = async arr => {
  const date = Date.now();
  await asyncForEach(arr, async element => {
    const imgLocation = await captureScreenshot(
      element.Permalink,
      `${element['Ad ID']}-${date}`
    );
    console.log(imgLocation);
    element.imgPath = imgLocation;
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
