export class BaseComponent {
  element: HTMLElement;
  constructor(title?:string, url?:string) {
    this.element = document.createElement('templete');
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.element);
  }
}