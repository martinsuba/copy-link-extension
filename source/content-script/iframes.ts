import IframeManager from 'iframe-manager';

import { DESTROY_IFRAME_TIMEOUT } from '../utils/constants';

const iframeManager = new IframeManager();

const style = {
  position: 'fixed',
  top: '10px',
  right: '10px',
  width: '115px',
  height: '100px',
  background: 'transparent',
  zIndex: 999999999,
  border: 0,
  boxShadow: 'none',
};

function destroyAllIframes(): void {
  const { iframes } = iframeManager;
  for (const iframe of iframes) {
    iframe.destroy();
  }
}

export function injectSuccessIframe(): void {
  destroyAllIframes();
  const successIframe = iframeManager.inject({
    source: chrome.runtime.getURL('iframes/success/index.html?msg=Copied'),
    style,
  });

  const destroyTimeout = setTimeout(() => {
    clearTimeout(destroyTimeout);
    successIframe.destroy();
  }, DESTROY_IFRAME_TIMEOUT);
}

export function injectFailureIframe(): void {
  destroyAllIframes();
  const failureIframe = iframeManager.inject({
    source: chrome.runtime.getURL('iframes/failure/index.html?msg=Failed'),
    style,
  });

  const destroyTimeout = setTimeout(() => {
    clearTimeout(destroyTimeout);
    failureIframe.destroy();
  }, DESTROY_IFRAME_TIMEOUT);
}
