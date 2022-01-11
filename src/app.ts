import { VideoComponent } from './components/page/item/video.js';
import { ImageComponent } from './components/page/item/image.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { Component } from './components/component.js';
class App {
  private readonly page: Component & Composable;
  
  private readonly image: ImageComponent;
  private readonly video: VideoComponent;
  private readonly note: NoteComponent;
  private readonly todo: TodoComponent;

  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    this.image = new ImageComponent('Image Title', 'https://picsum.photos/600/300');
    this.page.addChild(this.image);

    this.video = new VideoComponent('Video Title', `https://www.youtube.com/watch?v=Ua9NTFRQ1ms&ab_channel=%ED%95%B4%EC%AD%88%5BHAEJOO%5D`);
    this.page.addChild(this.video);
    
    this.note = new NoteComponent('Note Title', '노트내용');
    this.page.addChild(this.note);
    
    this.todo = new TodoComponent('TODO Title', '해야할것');
    this.page.addChild(this.todo);
  }
}

new App(document.querySelector('.document')! as HTMLElement);