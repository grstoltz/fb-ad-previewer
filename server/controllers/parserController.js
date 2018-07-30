const Nightmare = require('nightmare');
const path = require('path');
const fs = require('fs');
const screenshotSelector = require('nightmare-screenshot-selector');
const vo = require('vo');
const csv = require('csvtojson');

Nightmare.action('screenshotSelector', screenshotSelector);

const captureScreenshot = async (url, id) => {
  console.log(url, id);
  const logInSelector = '#u_0_c';
  const overlaySelector = '#u_0_b';
  const x = await new Nightmare()
    .goto(url)
    .wait(1000)
    .evaluate(logInSelector => {
      if (document.querySelector(logInSelector)) {
        const elem = document.querySelector(logInSelector);
        elem.parentNode.removeChild(elem);
      }
    }, logInSelector)
    .evaluate(overlaySelector => {
      if (document.querySelector(overlaySelector)) {
        const elem = document.querySelector(overlaySelector);
        elem.parentNode.removeChild(elem);
      }
    }, overlaySelector)
    .screenshotSelector('#stream_pagelet') // get the image in a buffer
    .then(data => {
      const location = `${path.join(__dirname, '..', `public/${id}.png`)}`;
      fs.writeFileSync(location, data);
      return location;
    });
  return x;
};

const processArray = async arr => {
  for (let i = 0; i < arr.length; i++) {
    const location = await captureScreenshot(arr[i].Permalink, arr[i]['Ad ID']);
    arr[i].adPath = location;
  }
  return arr;
};

const parseCSV = async filePath => {
  const newArr = await csv()
    .fromString(filePath)
    .then(jsonArr => {
      return processArray(jsonArr);
    });
  return newArr;
};

exports.parse = async (req, res, next) => {
  const buffer = req.files[0].buffer.toString('utf8');
  const processedArray = await parseCSV(buffer);
  // res.app.locals.data = processedArray;
  res.send(processedArray);
  //res.app.locals.data = 'test';
  //console.log(processedArray);
  // next();
};
