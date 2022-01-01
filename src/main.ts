'use strict'

type ComponentType = 'image' | 'video' | 'Note' | 'Task';
class PageComponent {
  type:ComponentType;
  contents:string;
  constructor(type:ComponentType, contents:string) {
    this.type = type;
    this.contents = contents; 
  }
}

const buttons= document.querySelectorAll("button");
//buttons.addEventListener("click", handleClick);

function handleClick() {
  console.log(this);
}
