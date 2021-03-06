import { BaseComponent } from "../../component.js";
export class ImageComponent extends BaseComponent<HTMLElement>{
  
  constructor(title: string, url: string) {
    super(`<section class="image">
            <div class="image__holder">
                <img class="image__thumbnail"></img>
            </div>
            <h2 class="page-item__title image__title"></h2>
          </section>`);
    
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

  
}