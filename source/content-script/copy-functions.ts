import { saveTextToClipboard } from './clipboard';

export function copyWebsiteURL(): false {
  const currentURL = window.location.href;
  saveTextToClipboard(currentURL);
  return false;
}

export function copyImageURL(image: HTMLImageElement): false {
  const { src } = image;
  saveTextToClipboard(src);
  return false;
}

export function copyLinkURL(link: HTMLAnchorElement): false {
  const { href } = link;
  saveTextToClipboard(href);
  return false;
}
