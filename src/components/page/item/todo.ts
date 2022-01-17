import { BaseComponent } from "../../component.js";
export class TodoComponent extends BaseComponent<HTMLInputElement>{
  
  constructor(title: string, todo: string) {
    super(`<section class="todo">
              <h2 class="page-item__title todo__title"></h2>
              <input type="checkbox" id="todo__checkbox">
              </input>
              <label for="todo-checkbox" class="todo-label"></label>
          </section>`);

    const titleElement = this.element.querySelector('.todo__title')! as HTMLParagraphElement;
    titleElement.textContent = title;
    
    const todoElement = this.element.querySelector('.todo-label')! as HTMLParagraphElement;
    todoElement.textContent = todo;

  }

  
}