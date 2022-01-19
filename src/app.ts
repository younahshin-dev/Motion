import { VideoComponent } from './components/page/item/video.js';
import { ImageComponent } from './components/page/item/image.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { Component } from './components/component.js';
import { inputDialog, MediaData, TextData } from './components/dialog/dialog.js';
import { MediaSection } from './components/dialog/item/media-section.js';
import { TextSection } from './components/dialog/item/text-section.js';

type InputComponentConstuctor<T = (MediaData | TextData) & Component> = {
  new (): T;
}
class App {
  private readonly page: Component & Composable;
  
  
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);
     
    this.bindElementToDialog<MediaSection>("#add-Image", MediaSection, (inputSection:MediaSection) => new ImageComponent(inputSection.title, inputSection.url));
   
    
    this.bindElementToDialog<MediaSection>("#add-Video", MediaSection, (inputSection:MediaSection) => new VideoComponent(inputSection.title, inputSection.url));

    
    this.bindElementToDialog<TextSection>("#add-Note", TextSection, (inputSection:TextSection) => new NoteComponent(inputSection.title, inputSection.body));

    this.bindElementToDialog<TextSection>("#add-Task", TextSection, (inputSection:TextSection) => new TodoComponent(inputSection.title, inputSection.body));
    
     // For demo :)
     this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/800/400'));
     this.page.addChild(new VideoComponent('Video Title', 'https://youtu.be/D7cwvvA7cP0'));
     this.page.addChild(new NoteComponent('Note Title', "Don't forget to code your dream"));
     this.page.addChild(new TodoComponent('Todo Title', 'TypeScript Course!'));
     this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/800/400'));
     this.page.addChild(new VideoComponent('Video Title', 'https://youtu.be/D7cwvvA7cP0'));
     this.page.addChild(new NoteComponent('Note Title', "Don't forget to code your dream"));
     this.page.addChild(new TodoComponent('Todo Title', 'TypeScript Course!'));
  }
  private bindElementToDialog<T extends (MediaData | TextData) & Component> 
    (
      selector: string, 
      inputComponent: InputComponentConstuctor<T>,
      makeSection: (input:T) => Component,
    ) {
    const element = document.querySelector(selector) as HTMLButtonElement;

    element.addEventListener('click', () => {
      const dialog = new inputDialog();
      const inputSection = new inputComponent();
      dialog.addChild(inputSection);
      dialog.attachTo(this.dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });
      dialog.setOnSubmitListener (() => {
        const todo = makeSection(inputSection);
        this.page.addChild(todo);
        dialog.removeFrom(this.dialogRoot);
      });

      
    });
  }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);