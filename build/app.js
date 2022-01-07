import { VideoComponent } from './components/page/item/video.js';
import { ImageComponent } from './components/page/item/image.js';
import { PageComponent } from './components/page/page.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
class App {
    constructor(appRoot) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
        this.image = new ImageComponent('Image Title', 'https://picsum.photos/600/300');
        this.image.attachTo(appRoot, 'beforeend');
        this.video = new VideoComponent('Video Title', 'https://youtu.be/Y9H3V6n4vUA?t=348');
        this.video.attachTo(appRoot, 'beforeend');
        this.note = new NoteComponent('Note Title', '노트내용');
        this.note.attachTo(appRoot, 'beforeend');
        this.todo = new TodoComponent('해야할일');
        this.todo.attachTo(appRoot, 'beforeend');
    }
}
new App(document.querySelector('.document'));
//# sourceMappingURL=app.js.map