/* eslint-disable no-console */
export function saveTextToClipboard(text: string): void {
  (async () => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('copied');
    } catch (err) {
      console.error(err);
    }
  })();
}
