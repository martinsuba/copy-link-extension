import { loadHistory, clearHistory } from '../utils/storage';
import logger from '../utils/logger';

import './index.scss';

const listElement = document.querySelector('.history-list');

function appendItemsToList(list: Element, items: string[]): void {
  let listItems = '';
  items.forEach((item) => {
    listItems += `<li><a href="${item}" target="_blank">${item}</a></li>`;
  });
  list.innerHTML = listItems;
}

document.querySelector('.clear-history').addEventListener('click', () => {
  clearHistory()
    .then(() => {
      listElement.innerHTML = '';
    })
    .catch((err) => logger.error(err));
});

(async () => {
  try {
    const history = await loadHistory();
    appendItemsToList(listElement, history);
  } catch (err) {
    logger.error(err);
  }
})();
