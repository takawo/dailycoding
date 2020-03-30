let txtGraphicsArr = [];
let graphicsArr = [];
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let cols, rows;
let margin, offset, cellW, cellH;
let font;
let pallete = ["#FA7912","#080604","#CE3917","#E4E3E0","#212550","#DFA55D","#4B679E"];
let bg;
let graphics;

function preload(){
  font = loadFont("Shrikhand-Regular.ttf");
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  init();
}

function draw(){
  background(bg);
  for(let g of graphicsArr){
    g.render();
  }
  imageMode(CORNER);
  image(graphics,0,0);
  //noLoop();
}

function init() {
  let bgN = int(random(pallete.length));
  bg = pallete[bgN];
  pallete.splice(bgN,1);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);
  
  cols = 5;
  rows = 6;
  offset = width / 10;
  margin = offset / 5;
  cellW = int((width - offset * 2 - margin * (cols - 1)) / cols);
  cellH = int((height - offset * 2 - margin * (rows - 1)) / rows);

  let n = 0;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - cellW);
      let y = map(j, 0, rows - 1, offset, height - offset - cellH);
      let str = alphabet.substr(n, 1);
      let txtGraphics = createGraphics(cellW, cellH);
      txtGraphics.colorMode(HSB, 360, 100, 100, 100);
      txtGraphics.textAlign(CENTER, CENTER);
      txtGraphics.textFont(font);
      txtGraphics.textSize(cellW*0.85);
      txtGraphics.text(str, txtGraphics.width / 2, txtGraphics.height / 3);
      let myGraphics = new MyGraphics(txtGraphics,x+cellW/2,y+cellH/2);
      graphicsArr.push(myGraphics);
      n++;
    }
  }
}

class MyGraphics {
  constructor(g, x, y) {
    this.g = g;
    this.pos = createVector(x, y);
    this.graphicsArr = [];
    this.arrNum = int(random(5,10));
    let sepNum = 50;
    let prevC = -1;
    for (let i = 0; i < this.arrNum; i++) {
      let g = createGraphics(this.g.width, this.g.height);
      g.colorMode(HSB, 360, 100, 100, 100);
      let c = random(pallete);
      while(c == prevC){
        c = random(pallete);
      }
      g.fill(c);
      prevC = c;
      g.noStroke();
      let r = map(i, 0, this.arrNum - 1, this.g.width / 2, this.g.width / 2 / this.arrNum);
      let rMin = r - this.g.width / 2 / this.arrNum;
      g.beginShape();
      for (let angle = 0; angle < 360; angle += 360 / sepNum) {
        let x = g.width / 2 + cos(angle) * r;
        let y = g.height / 2 + sin(angle) * r;
        g.vertex(x, y);
      }
      g.beginContour();
      for (let angle2 = 360; angle2 > 0; angle2 -= 360 / sepNum) {
        let x = g.width / 2 + cos(angle2) * rMin;
        let y = g.height / 2 + sin(angle2) * rMin;
        g.vertex(x, y);
      }
      g.endContour();
      g.endShape(CLOSE);
      let t = createImage(this.g.width, this.g.height);
      t.copy(g, 0, 0, this.g.width, this.g.height, 0, 0, this.g.width, this.g.height);
      t.mask(this.g);
      this.graphicsArr.push(t);
    }
  }

  render() {
    let i = 0;
    for (let t of this.graphicsArr) {
      imageMode(CENTER);
      push();
      translate(this.pos.x, this.pos.y);
      rotate(pow(sin(map(i,0,this.arrNum-1,0,90)+frameCount*2),3) * 30);
      image(t, 0, 0);
      pop();
      i++;
    }
  }
}


function drawNoiseBackground(_n, _graphics) {
  for (let i = 0; i < _n; i++) {
    
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(0,0,100,10);
    _graphics.ellipse(x, y, w, h);
  }
}