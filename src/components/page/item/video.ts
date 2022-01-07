import { BaseComponent } from "../../component.js";
export class VideoComponent extends BaseComponent<HTMLVideoElement>{
  
  constructor(title: string, url: string) {
    super(`<section class="video">
            <div class="video__holder">
              <video >
              <source class="video__thumbnail" 
            type="video/webm">
              </video>
            </div>
            <p class="video__title"></p>
          </section>`);
    
    const videoElement = this.element.querySelector('.video__thumbnail')! as HTMLVideoElement;
    videoElement.src = url;
    videoElement.id = title;

    const titleElement = this.element.querySelector('.video__title')! as HTMLParagraphElement;
    titleElement.textContent = title;

  }

  
}