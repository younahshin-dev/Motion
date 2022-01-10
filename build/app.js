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
        this.page.addChild(this.image);
        this.video = new VideoComponent('Video Title', `https://www.youtube.com/watch?v=Ua9NTFRQ1ms&ab_channel=%ED%95%B4%EC%AD%88%5BHAEJOO%5D`);
        this.page.addChild(this.video);
        this.note = new NoteComponent('Note Title', '노트내용');
        this.page.addChild(this.note);
        this.todo = new TodoComponent('TODO Title', '해야할것');
        this.page.addChild(this.todo);
    }
}
new App(document.querySelector('.document'));
//# sourceMappingURL=app.js.map