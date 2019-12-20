import logger from '../utils/logger';

logger.debug('background script');

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.extension.getURL('./ui/index.html') });
});

chrome.commands.onCommand.addListener((event) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { event }, (response) => {
      if (response?.err != null) {
        logger.error(response.err);
      } else {
        logger.debug(response);
      }
    });
  });
});
