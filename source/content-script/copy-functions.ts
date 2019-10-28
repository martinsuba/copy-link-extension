import { saveTextToClipboard } from './clipboard';
import { addToHistory } from '../utils/storage';

export async function copyWebsiteURL(): Promise<void> {
  const currentURL = window.location.href;
  await saveTextToClipboard(currentURL);
  await addToHistory(currentURL);
}

export async function copyImageURL(image: HTMLImageElement): Promise<void> {
  const { src } = image;
  await saveTextToClipboard(src);
  await addToHistory(src);
}

export async function copyLinkURL(link: HTMLAnchorElement): Promise<void> {
  const { href } = link;
  await saveTextToClipboard(href);
  await addToHistory(href);
}
