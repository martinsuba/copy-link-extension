interface ObserverConfig {
  selector: string;
  callback: (elements: NodeList) => void;
}

const excludeNodeNames = ['SCRIPT', 'LINK'];

export default class Observer {
  config: ObserverConfig[];

  constructor(config: ObserverConfig[]) {
    this.config = config;
    this.init();
  }

  private init() {
    const observer = new MutationObserver(this.observerCallback.bind(this));
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  private observerCallback(mutationsList: MutationRecord[]): void {
    for (const mutation of mutationsList) {
      const { addedNodes, removedNodes } = mutation;

      for (const addedNode of addedNodes) {
        if (Array.from(removedNodes).includes(addedNode) || !addedNode.nodeName || excludeNodeNames.includes(addedNode.nodeName)) {
          continue;
        }

        if (addedNode instanceof Element && addedNode.childElementCount) {
          this.config.forEach((observerConfig) => {
            const elements = addedNode.querySelectorAll(observerConfig.selector);
            if (elements.length) {
              observerConfig.callback(elements);
            }
          });
        }
      }
    }
  }
}
