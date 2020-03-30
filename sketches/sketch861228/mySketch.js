// let str = "01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ./!?";
// 
let str = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";
let alphabets = [];
let font = '"Menlo", "Monaco", "Consolas", monospace';
let img;

function preload() {
  img = loadImage("https://loremflickr.com/800/800");
}

function setup() {
  createCanvas(800, 800);		
  for (let i = 0; i < str.length; i++) {
    alphabets.push(new Alphabet(str.substr(i, 1)));
  }
  alphabets.sort(function(a, b) {
    if (a.v > b.v) {
      return 1;
    } else {
      return -1;
    }
  })
}

function draw() {
  background(255);
  // print(alphabets);
  let cells = 100;
  let d = width / cells;
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = map(i, 0, cells, 0, width);
      let y = map(j, 0, cells, 0, height);
      let cx = x + d / 2;
      let cy = y + d / 2;
      let c = img.get(cx, cy);
      let b = sq(brightness(c) / 100);
      str = alphabets[int(map(b, 1, 0, 0, alphabets.length - 1))].s;
      textSize(d*1.1);
      textFont(font);
      textAlign(CENTER, CENTER);
      //fill(c);
      text(str, cx, cy);
    }
  }
  image(img, 20, 20, 100, 100);
  noLoop();
}

class Alphabet {
  constructor(str) {
    this.s = str;
    this.v = 0;
    this.g = createGraphics(5, 5);
    this.g.textSize(10);
    this.g.textFont(font);
    this.g.textAlign(CENTER, CENTER);
    this.g.text(this.s, this.g.width / 2, this.g.height / 2);
    for (let j = 0; j < this.g.height; j++) {
      for (let i = 0; i < this.g.width; i++) {
        let a = alpha(this.g.get(i, j));
        this.v += a;
      }
    }
    // image(this.g, random(width), random(height), 20, 20);
  }

}