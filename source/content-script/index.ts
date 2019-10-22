import hotkeys from 'hotkeys-js';

import { copyWebsiteURL, copyImageURL, copyLinkURL } from './copy-functions';
import { SHORTCUTS } from './constants';
import HoveredElement from './HoveredElement';
import { injectSuccessIframe, injectFailureIframe } from './iframes';

const image = new HoveredElement('img');
const link = new HoveredElement('a');

// copy current website url
hotkeys(SHORTCUTS.COPY_WEBSITE_URL, (e) => {
  e.preventDefault();
  copyWebsiteURL()
    .then(() => injectSuccessIframe())
    .catch((err) => {
      injectFailureIframe();
      console.error(err); // eslint-disable-line no-console
    });
  return false;
});

// copy hovered image url
hotkeys(SHORTCUTS.COPY_IMAGE_URL, (e) => {
  if (image.hovered !== null) {
    e.preventDefault();
    copyImageURL(image.hovered as HTMLImageElement)
      .then(() => injectSuccessIframe())
      .catch((err) => {
        injectFailureIframe();
        console.error(err); // eslint-disable-line no-console
      });
    return false;
  }
  return true;
});

// copy hovered link url
hotkeys(SHORTCUTS.COPY_LINK_URL, (e) => {
  if (link.hovered !== null) {
    e.preventDefault();
    copyLinkURL(link.hovered as HTMLAnchorElement)
      .then(() => injectSuccessIframe())
      .catch((err) => {
        injectFailureIframe();
        console.error(err); // eslint-disable-line no-console
      });
    return false;
  }
  return true;
});
