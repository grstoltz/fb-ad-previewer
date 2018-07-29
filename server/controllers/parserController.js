const fs = require('fs');
const path = require('path');
const Nightmare = require('nightmare');
const screenshotSelector = require('nightmare-screenshot-selector');
const csv = require('csvtojson');

Nightmare.action('screenshotSelector', screenshotSelector);

const captureScreenshot = async (url, id) => {
  console.log(id);
  const logInSelector = '#u_0_c';
  const overlaySelector = '#u_0_b';
  const x = await new Nightmare()
    .goto(url)
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
    .screenshotSelector({ selector: '#stream_pagelet', path: `${id}.png` }) // get the image in a buffer
    .end();
};

const getScreenshots = data => {
  data.forEach(element => {
    captureScreenshot(element.Permalink, element['Ad ID']);
  });
};

const parseCSV = filePath => {
  csv()
    .fromString(filePath)
    .then(jsonObj => {
      console.log(jsonObj);
      getScreenshots(jsonObj);
    });
};

exports.parse = (req, res) => {
  const buffer = req.files[0].buffer.toString('utf8');
  parseCSV(buffer);
  res.send('complete');
};
