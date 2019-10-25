export default class HoveredElement {
  hovered: Node;

  constructor(selector: string) {
    this.hovered = null;
    this.addListeners(this.getElements(selector));
  }

  private getElements(selector: string): NodeList {
    return document.querySelectorAll(selector);
  }

  addListeners(elements: NodeList): void {
    elements.forEach((element) => element.addEventListener('mouseenter', () => {
      this.hovered = element;
    }));
    elements.forEach((element) => element.addEventListener('mouseleave', () => {
      this.hovered = null;
    }));
  }
}
