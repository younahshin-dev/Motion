import { BaseComponent } from "../base.js";
export class PageComponent extends BaseComponent{
  
  constructor() {
    super();
    this.element = document.createElement('ul');
    this.element.setAttribute('class', 'page');
    this.element.textContent = 'This is PageComponent';
  }
  
}