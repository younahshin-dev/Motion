import { BaseComponent } from "../../component.js";
export class NoteComponent extends BaseComponent<HTMLTextAreaElement>{
  
  constructor(title: string, note: string) {
    super(`<section class="note">
              <h2 class="note__title"></h2>
              <p class="note__body"></p>
            </section>`);

    const titleElement = this.element.querySelector('.note__title')! as HTMLHeadingElement;
    titleElement.textContent = title;

    const noteElement = this.element.querySelector('.note__body')! as HTMLParagraphElement;
    noteElement.textContent = note;
  }

  
}