import { BaseComponent } from "../../component.js";
export class TodoComponent extends BaseComponent<HTMLInputElement>{
  
  constructor(title: string) {
    super(`<section class="todo">
            <div class="todo__holder">
              <input type="checkbox" class="todo__check">
              </input>
              <p class="todo__title"></p>
            </div>
          </section>`);

    const titleElement = this.element.querySelector('.todo__title')! as HTMLParagraphElement;
    titleElement.textContent = title;

  }

  
}