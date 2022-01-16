import { VideoComponent } from './components/page/item/video.js';
import { ImageComponent } from './components/page/item/image.js';
import { PageComponent, PageItemComponent } from './components/page/page.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { inputDialog } from './components/dialog/dialog.js';
import { MediaSection } from './components/dialog/item/media-section.js';
import { TextSection } from './components/dialog/item/text-section.js';
class App {
    constructor(appRoot, dialogRoot) {
        this.dialogRoot = dialogRoot;
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);
        this.bindElementToDialog("#add-Image", MediaSection, (inputSection) => new ImageComponent(inputSection.title, inputSection.url));
        this.bindElementToDialog("#add-Video", MediaSection, (inputSection) => new VideoComponent(inputSection.title, inputSection.url));
        this.bindElementToDialog("#add-Note", TextSection, (inputSection) => new NoteComponent(inputSection.title, inputSection.body));
        this.bindElementToDialog("#add-Task", TextSection, (inputSection) => new TodoComponent(inputSection.title, inputSection.body));
    }
    bindElementToDialog(selector, inputComponent, makeSection) {
        const element = document.querySelector(selector);
        element.addEventListener('click', () => {
            const dialog = new inputDialog();
            const inputSection = new inputComponent();
            dialog.addChild(inputSection);
            dialog.attachTo(this.dialogRoot);
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(this.dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                const todo = makeSection(inputSection);
                this.page.addChild(todo);
                dialog.removeFrom(this.dialogRoot);
            });
        });
    }
}
new App(document.querySelector('.document'), document.body);
//# sourceMappingURL=app.js.map