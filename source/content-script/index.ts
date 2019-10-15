import hotkeys from 'hotkeys-js';

import { copyWebsiteURL, copyImageURL, copyLinkURL } from './copy-functions';
import shortcuts from './shortcuts';
import HoveredElement from './HoveredElement';

const image = new HoveredElement('img');
const link = new HoveredElement('a');

// copy current website url
hotkeys(shortcuts.copyWebsiteURL, copyWebsiteURL);

// copy hovered image url
hotkeys(shortcuts.copyImageURL, (e) => {
  if (image.hovered !== null) {
    e.preventDefault();
    copyImageURL(image.hovered as HTMLImageElement);
  }
});

// copy hovered link url
hotkeys(shortcuts.copyLinkURL, (e) => {
  if (link.hovered !== null) {
    e.preventDefault();
    copyLinkURL(link.hovered as HTMLAnchorElement);
  }
});
