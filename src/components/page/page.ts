
import { BaseComponent, Component } from "../component.js";

export interface Composable {
  addChild(child: Component): void;
}

type OnCloseListener = () => void;
type DragState = 'start' | 'stop' | 'enter' | 'leave'; //타입을 정의 하는것은 해당 API 문서를 읽고 필요한 타입을 생각해보기 
type OnDragStateListener<T extends Component> = (target: T, state: DragState) => void;

interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
  setOnDranStateListener(listener: OnDragStateListener<SectionContainer>): void;
}

type SectionContainerConstructor = {
  new (): SectionContainer;
}

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer{
  private closeListener?: OnCloseListener;
  private dragStateListener?: OnDragStateListener<PageItemComponent>;
  constructor() {
    super(`<li draggable="true" class="page-item">
            <section class="page-item__body">
            </section>
            <div class="page-item__controls">
              <button class="close">&times;</button>
            </div>
          </li>`);

    const closeButton = this.element.querySelector(".close") as HTMLButtonElement;
    closeButton.onclick = () => {
      this.closeListener && this.closeListener();
    }
    this.element.addEventListener("dragstart", (event: DragEvent) => {
      this.onDragStart(event);
    });
    this.element.addEventListener("dragend", (event: DragEvent) => {
      this.onDragEnd(event);
    });
    this.element.addEventListener("dragenter", (event: DragEvent) => {
      this.onDragEnter(event);
    });
    this.element.addEventListener("dragleave", (event: DragEvent) => {
      this.onDragLeave(event);
    });
    
  }

 
  addChild(child: Component): void {
    const container = this.element.querySelector(".page-item__body") as HTMLHtmlElement;
    child.attachTo(container);
  }

  setOnCloseListener(listener: OnCloseListener): void {
    this.closeListener = listener;
  }

  setOnDranStateListener(listener: OnDragStateListener<PageItemComponent>): void{
    this.dragStateListener = listener;
  }
  

  onDragStart(_: DragEvent) {
    this.notifyDragObservers('start')
  }
  onDragEnd(_: DragEvent) {
    this.notifyDragObservers('stop')
  }

  onDragEnter(_: DragEvent) {
    this.notifyDragObservers('enter')
  }

  onDragLeave(_: DragEvent) {
    this.notifyDragObservers('leave')
  }

  notifyDragObservers(state:DragState): void{
    this.dragStateListener && this.dragStateListener(this, state);
  }

}
export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable{
  
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super(`<ul class="page"></ul>`);

    this.element.addEventListener("dragover", (event: DragEvent) => {
      event.preventDefault();
      this.onDragOver(event);
    });
    this.element.addEventListener("drop", (event: DragEvent) => {
      event.preventDefault();
      this.onDrop(event);
    });
  }

  addChild(section:Component) {
    const item = new this.pageItemConstructor();
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
    item.setOnCloseListener(() => {
      item.removeFrom(this.element, section);
    });
    item.setOnDranStateListener((target: SectionContainer, state: DragState) => {
      console.log(target, state);
    })
  }

  onDragOver(event: DragEvent) {
    //console.log("drag onDragOver", event);
  }
  onDrop(event: DragEvent) {

    //console.log("drop", event);
  }
}