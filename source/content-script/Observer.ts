interface ObserverConfig {
  selector: string;
  callback: (elements: Element[]) => void;
}

const excludeNodeNames = ['SCRIPT', 'LINK'];

export default class Observer {
  config: ObserverConfig[];

  constructor(config: ObserverConfig[]) {
    this.config = config;
    this.init();
  }

  private init(): void {
    const observer = new MutationObserver(this.observerCallback.bind(this));
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
    });
  }

  private observerCallback(mutationsList: MutationRecord[]): void {
    for (const mutation of mutationsList) {
      const {
        addedNodes, removedNodes, type, target,
      } = mutation;

      if (type === 'attributes') {
        this.config.forEach((observerConfig) => {
          if (target.nodeName.toLowerCase() === observerConfig.selector) {
            observerConfig.callback([target as Element]);
          }
        });
      } else {
        for (const addedNode of addedNodes) {
          if (Array.from(removedNodes).includes(addedNode) || !addedNode.nodeName || excludeNodeNames.includes(addedNode.nodeName)) {
            continue;
          }

          if (addedNode instanceof Element && addedNode.childElementCount) {
            this.config.forEach((observerConfig) => {
              const elements = Array.from(addedNode.querySelectorAll(observerConfig.selector));
              if (elements.length) {
                observerConfig.callback(elements);
              }
            });
          }
        }
      }
    }
  }
}
