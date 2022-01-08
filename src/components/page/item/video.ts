import { BaseComponent } from "../../component.js";
export class VideoComponent extends BaseComponent<HTMLElement>{
  
  constructor(title: string, url: string) {
    super(`<section class="video">
            <div class="video__player">
              <iframe class="video__iframe"></iframe>
            </div>
            <h3 class="video__title"></h3>
          </section>`);
    
    const titleElement = this.element.querySelector('.video__title')! as HTMLHeadingElement;
    titleElement.textContent = title;

    const videoElement = this.element.querySelector('.video__iframe')! as HTMLIFrameElement;
    videoElement.src = url;

  }

  
}