import { syncStorage } from 'extension-storage-promise';
import { STORAGE_NAME } from './constants';

export async function loadHistory(): Promise<string[]> {
  return syncStorage.getOneRecord(STORAGE_NAME) as Promise<string[]>;
}

function saveHistory(state: string[]): Promise<void> {
  return syncStorage.setOneRecord(STORAGE_NAME, state);
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
