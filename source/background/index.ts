import logger from '../utils/logger';

logger.debug('background script');

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.extension.getURL('./ui/index.html') });
});
