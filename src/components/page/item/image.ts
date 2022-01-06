
export class ImageComponent {
  private element: HTMLElement;
  
  constructor(title:string, url:string) {

    const template = document.createElement('template');
    template.innerHTML = `<section class="image">
    <div class="image__holder">
      <img class="image__thumbnail"></img>
    </div>
    <p class="image__title"></p>
  </section>`;

  this.element = template.content.firstElementChild! as HTMLElement;
  const imageElement = this.element.querySelector('.image__thumbnail')! as HTMLImageElement;
  imageElement.src = url;
  imageElement.alt = title;

  const titleElement = this.element.querySelector('.image__title')! as HTMLParagraphElement;
  titleElement.textContent = title;

    // this.element = document.createElement('div');
    // this.imgElement = document.createElement('img');
    // this.imgElement.setAttribute('src', 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg');
    // this.element.setAttribute('class', 'image');
    // this.textElement = document.createTextNode("image component");
    // this.element.appendChild(this.imgElement);
    // this.element.appendChild(this.textElement);
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.appendChild(this.element);
  }
}