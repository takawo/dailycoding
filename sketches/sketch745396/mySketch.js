let img;
let w = 800;
let offset = w/10;
let imgW = w - offset * 2;
let graphic;
let movers = [];
let cells,cols,rows,cellW,cellH;

function preload(){
  img = loadImage("https://loremflickr.com/"+imgW+"/"+imgW+"/");
}

function setup() {
  createCanvas(w, w);
  graphic = createGraphics(width,height);
  graphic.image(img,offset,offset);
  cells = int(random(5,10))*10;
  cols = cells;
  rows = cells;
  
  cellW = (width - offset * 2) / cols;
  cellH = (height - offset * 2) / rows;
  
  for(let j = 0; j < rows; j++){
  for(let i = 0; i < cols; i++){
    let x = map(i,0,cols-1,offset,width-offset - cellW);
    let y = map(j,0,rows-1,offset,height-offset - cellH);
    let c = graphic.get(x,y);
    movers.push(new Mover(x,y,c));
  }
  }
  image(graphic,0,0);
}

function draw() {
  for(let m of movers){
    m.update();
    m.display()
  }
  image(img,width-width/10,height-height/10,width/10,height/10);
  if(frameCount > 1000){
    noLoop();
  }
}

class Mover {
  constructor(_x, _y, _c) {
    this.pos = createVector(_x, _y);
    let nx = 1 / 150;
    let ny = 1 / 100;
    this.noiseScale = createVector(nx, ny);
    this.life = 255;
    this.lifeRatio = this.life / 300;
    this.c = _c;
  }
  update() {
    let n = noise(this.pos.x * this.noiseScale.x,
      this.pos.y * this.noiseScale.y);
    let angle = map(n, 0, 1, -180, 180);
    angle = (angle + frameCount / 10) % 360;
    let vel = createVector(cos(angle), sin(angle));
    this.pos.add(vel);
    this.life -= this.lifeRatio;
    this.c = color(red(this.c),green(this.c),blue(this.c),this.life/255*100);
  }
  display() {
    stroke(this.c);
    strokeWeight(map(this.life,0,255,0,5));
    point(this.pos.x, this.pos.y);
  }
}