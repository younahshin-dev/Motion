import { BaseComponent } from '../../component.js';
export class MediaSection extends BaseComponent<HTMLElement> {
  constructor() {
    super(`<div>
            <div class="form__container">
              <label for="title">Title</label>
              <input type="text" id="title" />
            </div>
            <div> class="form__container">
              <label for="body">BODY</label>
              <textarea type="text" row="3" id="body" />
            </div>
          </div>
    `);
  }
  get title(): string {
    const element = this.element.querySelector("#title")! as HTMLInputElement;
    return element.value;
  }
  get body(): string {
    const element = this.element.querySelector("#body")! as HTMLTextAreaElement;
    return element.value;
  }

}