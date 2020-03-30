let emojiGraphics;
let emojiArr;
let ripperArr;
let cells, cols, rows;
let cellW, cellH;
let arr;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  emojiArr = createEmojiArr();
  init();
}

function init(){
  background(0,0,90);
  emojiGraphics = createGraphics(width, height);
  emojiGraphics.textSize(emojiGraphics.width*0.66);
  emojiGraphics.textAlign(CENTER, CENTER);
  emojiGraphics.text(random(emojiArr), emojiGraphics.width / 2, emojiGraphics.height / 2);
  arr = [];
  cells = int(random(5, 10));
  cols = cells;
  rows = cells;
  cellW = emojiGraphics.width / cols;
  cellH = emojiGraphics.height / rows;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = i * cellW;
      let y = j * cellH;
      let img = emojiGraphics.get(x,y,cellW,cellH);
      x += random(-cellW,cellW)/5;
      y += random(-cellW,cellW)/5;
      //image(img,x,y);
      arr.push(new EmojiMover(img,x+cellW/2,y+cellH/2));
    }
  }
}


function draw() {
  for(i of arr){
    i.update();
    i.display();
    i.checkEdges();
  }
  if(frameCount %150== 0){
    init();
  }
  noStroke();
  fill(0,0,50);
  rect(width-width/10,height-height/10,width/10,height/10);
  imageMode(CORNER);
  image(emojiGraphics,width-width/10,height-height/10,width/10,height/10);
}

class EmojiMover{
  constructor(img,x,y){
    this.img = img.get();
    this.size = createVector(this.img.width,this.img.height);
    this.pos = createVector(x,y);
    this.noiseScale = 800;
    this.angle;
    this.life = 150;
  }
  update(){
    let n = noise(this.pos.x/this.noiseScale,this.pos.y/this.noiseScale,frameCount/this.noiseScale);
    this.angle = map(n,0,1,-360,360);
    this.pos.add(createVector(cos(this.angle),sin(this.angle)).mult(3));
    this.life--;
  }
  display(){
    imageMode(CENTER);
    let ratio = max(map(this.life,0,150,0,1),0);
    push();
    translate(this.pos.x,this.pos.y);
    rotate(this.angle);
    image(this.img,0,0,this.size.x*ratio,this.size.y*ratio);
    pop();
  }
  checkEdges(){
    if(this.pos.x-cellW/2 > width) this.pos.x -= width+cellW;
    if(this.pos.y-cellH/2 > height) this.pos.y -= height+cellH;
    if(this.pos.x+cellW/2 < 0) this.pos.x += width+cellW;
    if(this.pos.y+cellH/2 < 0) this.pos.y += height+cellH;
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