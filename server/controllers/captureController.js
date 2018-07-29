const Nightmare = require('nightmare');
const fs = require('fs');
const screenshotSelector = require('nightmare-screenshot-selector');

Nightmare.action('screenshotSelector', screenshotSelector);

// const nightmare = new Nightmare();

(async () => {
  const x = await new Nightmare()
    .goto(
      'https://business.facebook.com/1818914131671420/posts/2043109195918578?business_id=1302633089788688'
    )
    .screenshotSelector({ selector: '#stream_pagelet', path: 'screen.png' }) // get the image in a buffer
    .end();
  console.log(x); // test
})();

// nightmare
//   .goto(
//     'https://business.facebook.com/1818914131671420/posts/2043109195918578?business_id=1302633089788688'
//   )
//   .screenshotSelector({ selector: '#stream_pagelet', path: 'screen.png' }) // get the image in a buffer
//   .end();
