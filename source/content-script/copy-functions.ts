import copy from 'copy-text-to-clipboard';
import { addToHistory } from '../utils/storage';

function saveTextToClipboard(text: string): void {
  const success = copy(text);
  if (!success) {
    throw new Error('Failed to copy.');
  }
}

export async function copyWebsiteURL(): Promise<void> {
  const currentURL = window.location.href;
  saveTextToClipboard(currentURL);
  await addToHistory(currentURL);
}

export async function copyImageURL(image: HTMLImageElement): Promise<void> {
  const { src } = image;
  saveTextToClipboard(src);
  await addToHistory(src);
}

export async function copyLinkURL(link: HTMLAnchorElement): Promise<void> {
  const { href } = link;
  saveTextToClipboard(href);
  await addToHistory(href);
}
