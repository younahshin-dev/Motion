import { BaseComponent } from './../../component.js';
export class MediaSection extends BaseComponent<HTMLElement> {
  constructor() {
    super(`<section class="image"><input type="text" class="image__title" value=""></input>
    <input type="text" class="image__url" value=""></input>
          </section>`);
  }

}