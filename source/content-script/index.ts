import { copyWebsiteURL, copyImageURL, copyLinkURL } from './copy-functions';
import { CopyEvents, IMAGE_SELECTOR, LINK_SELECTOR } from '../utils/constants';
import HoveredElement from './HoveredElement';
import { injectSuccessIframe, injectFailureIframe } from './iframes';
import Observer from './Observer';
import logger from '../utils/logger';

const { COPY_WEBSITE_URL, COPY_IMAGE_URL, COPY_LINK_URL } = CopyEvents;

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const observer = new Observer(observerConfig);

function success(sendResponse: (response?) => void): void {
  injectSuccessIframe();
  sendResponse({});
}

function failure(err: Error, sendResponse: (response?) => void): void {
  injectFailureIframe();
  logger.error(err);
  sendResponse({ err: err.message });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { event } = request;

  switch (event) {
    case COPY_WEBSITE_URL:
      copyWebsiteURL()
        .then(() => success(sendResponse))
        .catch((err: Error) => failure(err, sendResponse));
      break;
    case COPY_IMAGE_URL:
      if (image.hovered !== null) {
        copyImageURL(image.hovered as HTMLImageElement)
          .then(() => success(sendResponse))
          .catch((err: Error) => failure(err, sendResponse));
      }
      break;
    case COPY_LINK_URL:
      if (link.hovered !== null) {
        copyLinkURL(link.hovered as HTMLAnchorElement)
          .then(() => success(sendResponse))
          .catch((err: Error) => failure(err, sendResponse));
      }
      break;
    default:
      sendResponse({ err: new Error('Unhandled event.') });
  }

  // return true to indicate response is sent asynchronously
  return true;
});
