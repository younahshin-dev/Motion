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
    videoElement.src = this.convertToEmbeddedURL(url);

  }

  private convertToEmbeddedURL(inputUrl: string):string {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    const outputUrl = inputUrl.match(regExp);
    const videoId = outputUrl ? outputUrl[1] || outputUrl[2] : undefined;

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return inputUrl;
  }

  
}