
export class ImageComponent {
  private element: HTMLDivElement;
  private imgElement: HTMLImageElement;
  private textElement;
  
  constructor() {
    this.element = document.createElement('div');
    this.imgElement = document.createElement('img');
    this.imgElement.setAttribute('src', 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg');
    this.element.setAttribute('class', 'image');
    this.textElement = document.createTextNode("image component");
    this.element.appendChild(this.imgElement);
    this.element.appendChild(this.textElement);
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.appendChild(this.element);
  }
}