import { Composable } from '../page/page.js';
import { BaseComponent, Component } from './../component.js';

type OnEventListener = () => void;

export interface TextData {
  readonly title: string;
  readonly body: string;
}
export interface MediaData {
  readonly title: string;
  readonly url: string;
}
export class inputDialog extends BaseComponent<HTMLElement> implements Composable {
  private closeListener?: OnEventListener;
  private submitListener?: OnEventListener;
  constructor() {
    super(`<dialog class="dialog">
            <div class="dialog__container">
              <button class="close">&times;</button>
              <div class="dialog__body"></div>
              <button class="dialog__submit">ADD</button>
              </div>
          </dialog>`);


          const close = this.element.querySelector(".close") as HTMLButtonElement;
          close.onclick = () => {
            this.closeListener && this.closeListener();
          }
          const submit = this.element.querySelector(".dialog__submit") as HTMLButtonElement;
          submit.onclick = () => {
            this.submitListener && this.submitListener();
          }
  }

  addChild(child: Component): void {
    const container = this.element.querySelector(".dialog__body") as HTMLHtmlElement;
    child.attachTo(container);
  }
  
  setOnCloseListener(listener: OnEventListener): void {
    this.closeListener = listener;
  }

  setOnSubmitListener(listener: OnEventListener): void {
    this.submitListener = listener;
  }
}