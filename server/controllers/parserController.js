const d3 = require('d3-dsv');
const puppeteer = require('puppeteer');
const cloudinary = require('../services/cloudinary');

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

  /**
   * Takes a screenshot of a DOM element on the page, with optional padding.
   */
  async function screenshotDOMElement(opts = {}) {
    const padding = 'padding' in opts ? opts.padding : 0;
    const path = 'path' in opts ? opts.path : null;
    const { selector } = opts;
    const { customCSS } = opts;

    if (!selector) throw Error('Please provide a selector.');

    if (customCSS) {
      await page.evaluate(customCSS => {
        const style = document.createElement('style');
        const text = document.createTextNode(customCSS);
        style.setAttribute('type', 'text/css');
        style.appendChild(text);
        document.head.insertBefore(style, document.head.firstChild);
      });
    }

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
        y: rect.top,
        width: rect.width + padding * 2,
        height: rect.height + 25
      }
    });

    return screenshot;
  }

  const cssStr = `#u_0_c {
    display: none;
  }

  #headerArea{
     display: none;
  }
  
  #outdatedBrowserBanner {
    display: none;
  }
  
  #u_0_3 {
    display: none;
  }
  
  #u_0_9 {
    display: none;
  }
  
  #u_0_a {
    display: none;
  }`;

  const screenshot = await screenshotDOMElement({
    // path: 'element.png',
    selector: '#stream_pagelet',
    // padding: 8,
    customCSS: cssStr
  });

  const result = await cloudinary.upload(screenshot, instanceId);

  browser.close();

  return result;
};

const processArray = async (arr, req, instanceId) => {
  await asyncForEach(arr, async element => {
    const img = await captureScreenshot(element.Permalink, instanceId);
    element.imgPath = img.url; // eslint-disable-line
    element.createdBy = req.body.userId; // eslint-disable-line
  });
  return arr;
};

const parseTSV = async (str, req, instanceId) => {
  const parsedTSV = await d3.tsvParse(str);
  const processedArray = await processArray(parsedTSV, req, instanceId);
  return processedArray;
};

exports.parse = async (req, res, next) => {
  const instanceId = Math.random()
    .toString()
    .slice(2, 11);
  const strBuffer = req.files[0].buffer.toString('utf-16le');
  const processedArray = await parseTSV(strBuffer, req, instanceId);
  res.app.locals.data = processedArray;
  res.app.locals.instanceId = instanceId;
  next();
};
