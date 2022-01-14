import { VideoComponent } from './components/page/item/video.js';
import { ImageComponent } from './components/page/item/image.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { Component } from './components/component.js';
import { inputDialog } from './components/dialog/dialog.js';
import { MediaSection } from './components/dialog/item/mediaSection.js';
class App {
  private readonly page: Component & Composable;
  
  private readonly image: ImageComponent;
  private readonly video: VideoComponent;
  private readonly note: NoteComponent;
  private readonly todo: TodoComponent;
  
  private readonly mediaSection: MediaSection;

  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);


    this.video = new VideoComponent('Video Title', `https://www.youtube.com/watch?v=Ua9NTFRQ1ms&ab_channel=%ED%95%B4%EC%AD%88%5BHAEJOO%5D`);
    this.page.addChild(this.video);
    
    this.note = new NoteComponent('Note Title', '노트내용');
    this.page.addChild(this.note);
    
    this.todo = new TodoComponent('TODO Title', '해야할것');
    this.page.addChild(this.todo);

    
    this.image = new ImageComponent('Image Title', 'https://picsum.photos/600/300');
    this.page.addChild(this.image);

    const imageButton = document.querySelector("#add-Image") as HTMLButtonElement;
    this.mediaSection = new MediaSection();
    
    imageButton.addEventListener('click', () => {
      const dialog = new inputDialog();
      dialog.addChild(this.mediaSection);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(document.body);
      });
      dialog.setOnSubmitListener (() => {
        const title = document.querySelector(".image__title") as HTMLInputElement;
        const url = document.querySelector(".image__url") as HTMLInputElement;
        this.page.addChild(new ImageComponent(`${title.value}`, `${url.value}`));
        dialog.removeFrom(document.body);
      });

      dialog.attachTo(document.body);
      
    });
    
  }
}

new App(document.querySelector('.document')! as HTMLElement);