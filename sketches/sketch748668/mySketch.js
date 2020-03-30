let emojiArr;
let g;
let cells,cols,rows;
let offset,margin;
let cellW,cellH;
let emojiGraphicsArr;
let screenAngle;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  emojiArr = createEmojiArr();
  angleMode(DEGREES);
  graphics = createGraphics(width, height);
  drawNoiseBackground(10000, graphics);
  init();
  g = new EmojiGraphic(400, 400, 200, 200, random(emojiArr));
}

function init() {
  background(0, 0, 80);
  image(graphics, 0, 0);
  emojiGraphicsArr = [];
  screenAngle = int(random(8)) * 360/8;
  cells = int(random(3, 15));
  cols = cells;
  rows = cells;
  
  offset = width / 10;
  margin = offset / 5;

  let w = sqrt(sq(width / 2) + sq(height / 2));
  
  cellW = (w * 2 + offset * 2 - margin * (cols - 1)) / cols;
  cellH = (w * 2 + offset * 2 - margin * (rows - 1)) / rows;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i,0,cols-1,-w-offset,w+offset-cellW);
      let y = map(j,0,rows-1,-w-offset,w+offset-cellW);
      emojiGraphicsArr.push(new EmojiGraphic(x+cellW/2,y+cellH/2,cellW,cellH,random(emojiArr)));
    }
  }
}


function draw() {
  push();
  translate(width / 2, height / 2);
  rotate(screenAngle);
  let count = 0;
  for(let g of emojiGraphicsArr){
  g.update();
  g.render();
  g.isDead() ? count++:0;
  }
  if(count == emojiGraphicsArr.length){
    init();
  }
  pop();  
}

class EmojiGraphic {
  constructor(x, y, w, h, emojiStr) {
    this.dir = random() < 0.5 ? -1:1;
    this.pos = createVector(x, y);
    this.emoji = emojiStr;
    this.freq = random(1,5)/2;
    this.w = w;
    this.h = h;
    this.step = this.w / (360 * int(random(1,3)));
    this.size = w;
    this.graphic = createGraphics(this.w, this.h);
    this.graphic.textSize(this.size);
    this.graphic.textAlign(CENTER, CENTER);
    this.graphic.text(this.emoji, w / 2, h / 2);
    this.angle = int(random(360));
  }
  update() {
    this.angle = this.angle + this.dir * this.freq;
    this.size = constrain(this.size-this.step,0.1,this.w);
  }
  render() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.graphic, 0, 0,this.size,this.size);
    pop();
  }
  isDead() {
    return this.size <= 0.1;
  }
}

function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 20, 10);
  for (let i = 0; i < _n; i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 3);
    let h = random(1, 3);
    _graphics.noStroke();
    _graphics.fill(c);
    _graphics.ellipse(x, y, w, h);
  }
}

function createEmojiArr() {
  let arr = [];
  let emoji;
  for (let i = 128512; i < 128592; i++) {
    emoji = String.fromCodePoint(i);
    arr.push(emoji);
  }
  for (let i = 127744; i < 128318; i++) {
    emoji = String.fromCodePoint(i);
    arr.push(emoji);
  }
  return arr;
}