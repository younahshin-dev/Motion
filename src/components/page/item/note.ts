import { BaseComponent } from "../../component.js";
export class NoteComponent extends BaseComponent<HTMLTextAreaElement>{
  
  constructor(title: string, note: string) {
    super(`<section class="note">
            <div class="note__holder">
              <p class="note__title"></p>
              <textarea class="note__thumbnail">
              </textarea>
            </div>
          </section>`);
    
    const noteElement = this.element.querySelector('.note__thumbnail')! as HTMLTextAreaElement;
    noteElement.textContent = note;

    const titleElement = this.element.querySelector('.note__title')! as HTMLParagraphElement;
    titleElement.textContent = title;

  }

  
}