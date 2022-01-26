
import { BaseComponent, Component } from "../component.js";

export interface Composable {
  addChild(child: Component): void;
}

type OnCloseListener = () => void;
type DragState = 'start' | 'stop' | 'enter' | 'leave'; //타입을 정의 하는것은 해당 API 문서를 읽고 필요한 타입을 생각해보기 
type OnDragStateListener<T extends Component> = (target: T, state: DragState) => void;

interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
  setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void;
  muteChildren(state: 'mute' | 'unmute'): void;
  getBoundingClientRect(): DOMRect;
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

  setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>): void{
    this.dragStateListener = listener;
  }
  
  muteChildren(state: 'mute' | 'unmute') {
    if(state === 'mute') {
      this.element.classList.add('mute-children');
    } else {
      this.element.classList.remove('mute-children');
    }
    
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

  getBoundingClientRect(): DOMRect {
    return this.element.getBoundingClientRect();
  }
}
export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  private children = new Set<SectionContainer>(); // 페이지 아이템의 자식요소들을 알아야 drag & drop 시 자식요소에서 dragOver 가 발생하지 않게 처리 가능
  private dragTarget?: SectionContainer;
  private dropTarget?: SectionContainer;
  
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

  onDragOver(event: DragEvent) {
    event.preventDefault();
    //console.log("drag onDragOver", this.dragTarget);
  }
  onDrop(event: DragEvent) {
    event.preventDefault();
    //여기에서 위치를 바꿔주면 됨
    console.log('onDrop');
    console.log('this.dragTarget', this.dragTarget);
    
    if (!this.dropTarget) {
      return;
    }
    if (this.dragTarget && this.dragTarget !== this.dropTarget) {
      const dropY = event.clientY;
      const srcElement = this.dragTarget.getBoundingClientRect(); 
      this.dragTarget.removeFrom(this.element); //this.element = page
      this.dropTarget.attach(this.dragTarget, dropY > srcElement.y ?"afterend": "beforebegin"); // 요소의 밖의 앞
      //beforebegin 요소의 앞
      //afterbegin 요소의 안에서 첫번째 child의 앞
      //beforeend 요소의 안에서 마지막 child의 뒤
      //afterend 요소의 다음
    }
  }
  addChild(section:Component) {
    const item = new this.pageItemConstructor();
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
      this.children.delete(item); 
    });

    this.children.add(item); //페이지에 아이템을 등록하면 등록한 아이템의 모든 자식요소를 페이지컴포넌트의 변수에 저장
    item.setOnDragStateListener((target: SectionContainer, state: DragState) => {
      //console.log(target, state);
      switch(state) {
        case 'start':
          this.dragTarget = target;
          this.updateSections('mute'); //페이지에 등록된 아이템의 자식요소의 이벤트 포인터를 뮤트 
          console.log('start', target);
          break;
        case 'stop':
          this.dragTarget = undefined;
          this.updateSections('unmute');
          console.log('stop', target);
          break;
        case 'enter':
          this.dropTarget = target;
          console.log('enter', target);
          break;
        case 'leave':
          console.log('leave', target);
          this.dropTarget = undefined;
          break;
        default:
          throw new Error(`unsupported state: ${state}`);
          break;
      }
    })
  }

  private updateSections(state: 'mute' | 'unmute'): void {
    this.children.forEach((section: SectionContainer) => {
      section.muteChildren(state);
    });
  }
}