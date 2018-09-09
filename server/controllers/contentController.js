const d3 = require('d3-dsv');
const puppeteer = require('puppeteer');
const cloudinary = require('../services/cloudinary');
const db = require('../models');

exports.getContent = (req, res) => {
  const processResults = async arr => {
    const objArray = [];

    // Create campaigns
    await arr.forEach(element => {
      const idx = objArray.findIndex(
        elem => elem.campaignId === element.campaignId
      );
      if (idx === -1) {
        objArray.push({
          campaignId: element.campaignId,
          campaignName: element.campaignName,
          adSets: []
        });
      }
    });

    // Create AdSets and Ads
    await arr.forEach(element => {
      const { adSetId, adSetName, adId, adName, imgPath } = element;
      const idx = objArray.findIndex(
        elem => elem.campaignId === element.campaignId
      );

      const adSetIdx = objArray[idx].adSets.findIndex(
        elem => elem.adSetId === element.adSetId
      );

      if (adSetIdx === -1) {
        objArray[idx].adSets.push({
          adSetId,
          adSetName,
          ads: [
            {
              adId,
              adName,
              imgPath
            }
          ]
        });
      } else {
        objArray[idx].adSets[adSetIdx].ads.push({
          adId,
          adName,
          imgPath
        });
      }
    });

    res.status(200).send(objArray);
  };

  db.Content.findAll({ where: { instanceId: req.params.id } })
    .then(result => {
      processResults(result);
    })
    .catch(err => res.status(422).json(err));
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const captureScreenshot = async (url, instanceId) => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  // Adjustments particular to this page to ensure we hit desktop breakpoint.
  page.setViewport({ width: 1920, height: 1000, deviceScaleFactor: 1 });

  await page.goto(url, {
    waitUntil: 'networkidle0'
  });

  try {
    await page.click('#expanding_cta_close_button');
  } catch (e) {
    console.log(e);
  }

  /**
   * Takes a screenshot of a DOM element on the page, with optional padding.
   */
  async function screenshotDOMElement(opts = {}) {
    const padding = 'padding' in opts ? opts.padding : 0;
    const path = 'path' in opts ? opts.path : null;
    const { selector } = opts;

    if (!selector) throw Error('Please provide a selector.');

    const rect = await page.evaluate(selector => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const { x, y, width, height } = element.getBoundingClientRect();
      return { left: x, top: y, width, height, id: element.id };
    }, selector);

    if (!rect)
      throw Error(`Could not find element that matches selector: ${selector}.`);

    const screenshot = await page.screenshot({
      clip: {
        x: rect.left - padding,
        y: rect.top + 7,
        width: rect.width + padding * 2,
        height: rect.height + 5
      }
    });
    return screenshot;
  }

  const screenshot = await screenshotDOMElement({
    // path: 'element.png',
    selector: '#stream_pagelet'
    // padding: 8,
  });

  const result = await cloudinary.upload(screenshot, instanceId);

  browser.close();

  return result;
};

const processArray = async (arr, instanceId) => {
  await asyncForEach(arr, async element => {
    const img = await captureScreenshot(element.Permalink, instanceId);
    console.log(img);
    element.imgPath = img.url; // eslint-disable-line
  });
  return arr;
};

const parseTSV = async (str, instanceId) => {
  const parsedTSV = await d3.tsvParse(str);
  const processedArray = await processArray(parsedTSV, instanceId);
  return processedArray;
};

exports.createContent = async (instanceId, file) => {
  const strBuffer = file.buffer.toString('utf-16le');
  const processedArray = await parseTSV(strBuffer, instanceId);

  await asyncForEach(processedArray, element => {
    const {
      [Object.keys(element)[0]]: campaignId,
      'Campaign Name': campaignName,
      'Ad Set ID': adSetId,
      'Ad Set Name': adSetName,
      'Ad ID': adId,
      'Ad Name': adName,
      imgPath
    } = element;

    db.Content.create({
      campaignId,
      campaignName,
      adSetId,
      adSetName,
      adId,
      adName,
      imgPath,
      instanceId
    });
  });

  db.Instance.update(
    { processing: false },
    { where: { id: instanceId } }
  ).catch(err => console.log(err));
};
