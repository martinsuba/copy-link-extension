import { STORAGE_NAME } from './constants';

export function loadHistory(): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    try {
      chrome.storage.sync.get(STORAGE_NAME, ({ [STORAGE_NAME]: state }: { [STORAGE_NAME]: string[] }) => {
        if (state == null) {
          resolve([]);
        } else {
          resolve(state);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

function saveHistory(state: string[]): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      chrome.storage.sync.set({ [STORAGE_NAME]: state }, () => {
        resolve();
      });
    } catch (err) {
      reject(err);
    }
  });
}

export async function addToHistory(entry: string): Promise<void> {
  const currentState = await loadHistory();
  const newState = [
    ...currentState,
    entry,
  ];

  await saveHistory(newState);
}

export async function clearHistory(): Promise<void> {
  await saveHistory([]);
}
