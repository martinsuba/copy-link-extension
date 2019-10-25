import hotkeys from 'hotkeys-js';

import { copyWebsiteURL, copyImageURL, copyLinkURL } from './copy-functions';
import { SHORTCUTS, IMAGE_SELECTOR, LINK_SELECTOR } from './constants';
import HoveredElement from './HoveredElement';
import { injectSuccessIframe, injectFailureIframe } from './iframes';
import Observer from './Observer';

const image = new HoveredElement(IMAGE_SELECTOR);
const link = new HoveredElement(LINK_SELECTOR);

const observerConfig = [
  {
    selector: IMAGE_SELECTOR,
    callback: image.addListeners.bind(image),
  },
  {
    selector: LINK_SELECTOR,
    callback: link.addListeners.bind(link),
  },
];

// eslint-disable-next-line no-unused-vars
const observer = new Observer(observerConfig);

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
