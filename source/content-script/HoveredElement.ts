export default class HoveredElement {
  selector: string;
  hovered: Element;

  constructor(selector: string) {
    this.selector = selector;
    this.hovered = null;
    this.addListeners();
  }

  addListeners(): void {
    const elements = document.querySelectorAll(this.selector);
    elements.forEach((element) => element.addEventListener('mouseenter', () => {
      this.hovered = element;
    }));
    elements.forEach((element) => element.addEventListener('mouseleave', () => {
      this.hovered = null;
    }));
  }
}
