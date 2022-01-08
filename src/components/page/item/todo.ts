import { BaseComponent } from "../../component.js";
export class TodoComponent extends BaseComponent<HTMLInputElement>{
  
  constructor(title: string, body: string) {
    super(`<section class="todo">
              <h2 class="todo__title"></h2>
              <input type="checkbox" class="todo__checkbox">
              </input>
          </section>`);

    const titleElement = this.element.querySelector('.todo__title')! as HTMLParagraphElement;
    titleElement.textContent = title;
    
    const todoElement = this.element.querySelector('.todo__checkbox')! as HTMLParagraphElement;
    todoElement.insertAdjacentText('afterend', body);

  }

  
}