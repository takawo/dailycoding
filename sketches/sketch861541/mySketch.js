// let str = "01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ./!?";
// 
let str = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";
let alphabets = [];
let font = '"Menlo", "Monaco", "Consolas", monospace';
let capture;

function preload() {
  let constraints = {
    video: {
      mandatory: {
        minWidth: 1280,
        minHeight: 720
      },
      optional: [{
        maxFrameRate: 30
      }]
    },
    audio: false
  };
  capture = createCapture(constraints);
  capture.hide();
}

function setup() {
  createCanvas(1280, 720);
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
  let img = capture.get();
  let cols = 50;
  let rows = int(50 * 9 / 16);
  let d = width / max(cols, rows);
  textSize(d);
  textFont(font);
  textAlign(CENTER, CENTER);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols, 0, width);
      let y = map(j, 0, rows, 0, height);
      let cx = x + d / 2;
      let cy = y + d / 2;
      let c = img.get(cx, cy);
      let b = sq(brightness(c) / 100);
      str = alphabets[int(map(b, 1, 0, 0, alphabets.length - 1))].s;
      //fill(c);
      text(str, cx, cy);
    }
  }
  image(img, width - img.width / 6 - 20, height - img.height / 6 - 20, img.width / 6, img.height / 6);
  // 
}

class Alphabet {
  constructor(str) {
    this.s = str;
    this.v = 0;
    this.g = createGraphics(20, 20);
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