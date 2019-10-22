import { saveTextToClipboard } from './clipboard';

export async function copyWebsiteURL(): Promise<void> {
  const currentURL = window.location.href;
  await saveTextToClipboard(currentURL);
}

export async function copyImageURL(image: HTMLImageElement): Promise<void> {
  const { src } = image;
  await saveTextToClipboard(src);
}

export async function copyLinkURL(link: HTMLAnchorElement): Promise<void> {
  const { href } = link;
  await saveTextToClipboard(href);
}
