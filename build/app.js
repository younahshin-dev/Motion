import { ImageComponent } from './components/page/item/image.js';
import { PageComponent } from './components/page/page.js';
class App {
    constructor(appRoot) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
        this.image = new ImageComponent('Image Title', 'https://picsum.photos/600/300');
        this.image.attachTo(appRoot, 'beforeend');
    }
}
new App(document.querySelector('.document'));
//# sourceMappingURL=app.js.map