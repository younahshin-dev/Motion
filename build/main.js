'use strict';
class PageComponent {
    constructor(type, contents) {
        this.type = type;
        this.contents = contents;
    }
}
const buttons = document.querySelectorAll("button");
//buttons.addEventListener("click", handleClick);
function handleClick() {
    console.log(this);
}
//# sourceMappingURL=main.js.map