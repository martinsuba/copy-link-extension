function fallbackCopy(text: string): void {
  const input = document.createElement('input');
  const inputStyle = 'position: fixed; top: 0; left: 0; opacity: 0; z-index: -9999;';
  input.setAttribute('style', inputStyle);
  document.body.appendChild(input);
  input.value = text;
  input.focus();
  input.select();
  const result = document.execCommand('copy');
  if (!result) {
    throw new Error('execCommand is unsupported or disabled');
  }
  input.parentNode.removeChild(input);
}

export async function saveTextToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    console.log('copied with clipboard api');
  } else {
    fallbackCopy(text);
    console.log('copied with fallback');
  }
}
