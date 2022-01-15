import { VideoComponent } from './components/page/item/video.js';
import { ImageComponent } from './components/page/item/image.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { Component } from './components/component.js';
import { inputDialog } from './components/dialog/dialog.js';
import { MediaSection } from './components/dialog/item/media-section.js';
import { TextSection } from './components/dialog/item/text-section.js';
class App {
  private readonly page: Component & Composable;
  
  constructor(appRoot: HTMLElement, dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    const imageButton = document.querySelector("#add-Image") as HTMLButtonElement;

    imageButton.addEventListener('click', () => {
      const dialog = new inputDialog();
      const inputSection = new MediaSection();
      dialog.addChild(inputSection);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot);
      });
      dialog.setOnSubmitListener (() => {
        const image = new ImageComponent(inputSection.title, inputSection.url);
        this.page.addChild(image);
        dialog.removeFrom(dialogRoot);
      });
    });

    const videoButton = document.querySelector("#add-Video") as HTMLButtonElement;
    videoButton.addEventListener('click', () => {
      const dialog = new inputDialog();
      const inputSection = new MediaSection();
      dialog.addChild(inputSection);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot);
      });
      dialog.setOnSubmitListener (() => {


        const video = new VideoComponent(inputSection.title, inputSection.url);
        this.page.addChild(video);
        dialog.removeFrom(dialogRoot);
      });

      
    });

    const noteButton = document.querySelector("#add-Note") as HTMLButtonElement;
    noteButton.addEventListener('click', () => {
      const dialog = new inputDialog();
      const inputSection = new TextSection();
      dialog.addChild(inputSection);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot);
      });
      dialog.setOnSubmitListener (() => {


        const image = new NoteComponent(inputSection.title, inputSection.body);
        this.page.addChild(image);
        dialog.removeFrom(dialogRoot);
      });

      
    });

    const todoButton = document.querySelector("#add-Task") as HTMLButtonElement;

    todoButton.addEventListener('click', () => {
      const dialog = new inputDialog();
      const inputSection = new TextSection();
      dialog.addChild(inputSection);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot);
      });
      dialog.setOnSubmitListener (() => {
        const todo = new TodoComponent(inputSection.title, inputSection.body);
        this.page.addChild(todo);
        dialog.removeFrom(dialogRoot);
      });

      
    });
    
  }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);