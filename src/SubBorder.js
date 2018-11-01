export default class SubBorder {
  constructor(inset = false, blur = 0, size = 5, color = "rgb(0, 0, 0)"){
    this.inset = inset;
    this.blur = blur;
    this.size = size;
    this.color = color;
  }
  getCss(){
    return `${this.inset ? "inset ": ""}0 0 ${this.blur}${this.blur?"px":""} ${this.size}${this.size?"px":""} ${this.color}`;
  }
}