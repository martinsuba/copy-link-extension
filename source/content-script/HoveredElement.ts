export default class HoveredElement {
  hovered: Node;

  constructor(selector: string) {
    this.hovered = null;
    this.addListeners(this.getElements(selector));
  }

  private getElements(selector: string): Element[] {
    return Array.from(document.querySelectorAll(selector));
  }

  addListeners(elements: Element[]): void {
    elements.forEach((element) => element.addEventListener('mouseenter', () => {
      this.hovered = element;
    }));
    elements.forEach((element) => element.addEventListener('mouseleave', () => {
      this.hovered = null;
    }));
  }
}
