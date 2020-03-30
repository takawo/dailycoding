let cells, offset, margin, cellSize;
let movers = [];
let graphics;
let url = "https://coolors.co/app/ed6a5a-f4f1bb-9bc1bc-5ca4a9-e6ebe0";
let pallete;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  pallete = createPallete(url);
  
  graphics = createGraphics(width,height);
  graphics.colorMode(HSB,360,100,100,100);
  graphics.noStroke();
  graphics.fill(0,0,100,1);
  for(let i = 0; i< width * height * 10/100; i++){
    let x = random(width);
    let y = random(height);
    let w = random(2);
    let h = random(2);
    graphics.ellipse(x,y,w,h);
  }  
  
  cells =  8;
  offset = width / 10;
  margin = offset / 5;

  cellSize = (width - offset * 2 - margin * (cells - 1)) / cells;
  background(0, 0, 10);

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset + i * (cellSize + margin);
      let y = offset + j * (cellSize + margin);
      let m = new Mover(x + random(cellSize), y + random(cellSize));
      movers.push(m);
    }
  }
  background(0, 0, 10);
  image(graphics,0,0);
}

function draw() {
  // blendMode(BLEND);
  background(0, 0, 10, 5);
  // blendMode(ADD);
  for (let m of movers) {
    m.update();
    m.display();
  }
}

class Mover {
  constructor(x, y) {
    this.prevPoss = [];
    this.maxLength = 10;
    this.sc = random(pallete);
    this.fc = random(pallete);
    this.pos = createVector(x, y);
    this.prevPos = this.pos.copy();
    this.dir = int(random(8)) * 360 / 8;
    this.r = 2;
  }
  update() {
    if (random(100) < 5) {
      let newDir = this.dir;
      while (newDir == this.dir) {
        newDir = int(random(8)) * 360 / 8;
      }
      this.dir = newDir;
    }
    this.pos.add(createVector(cos(this.dir), sin(this.dir)).mult(this.r));

    if (this.pos.x < 0) {
      this.pos.x += width;
    this.prevPoss = [];
    }else if (this.pos.x > width) {
      this.pos.x -= width;
    this.prevPoss = [];
    }

    if (this.pos.y < 0) {
      this.pos.y += height;
    this.prevPoss = [];
    }else if (this.pos.y > height) {
      this.pos.y -= height;
    this.prevPoss = [];
    }

    this.prevPoss.push(this.pos.copy());

    if (this.prevPoss.length > this.maxLength) {
      this.prevPoss.shift();
    }
  }
  display() {
    stroke(this.sc);
    fill(this.fc);
    beginShape();
    let pp;
    for (let p of this.prevPoss) {
      if(typeof(pp) != 'undefined'){
        let d = p5.Vector.dist(p,pp);
        if(d > this.r*2){
          endShape();
          beginShape();
        }
      }
      vertex(p.x, p.y);
      pp = p.copy();
    }
    endShape();
    //print(this.prevPoss.length)
    this.prevPos = this.pos.copy();
  }
}

function createPallete(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');

  for (let i = 0; i < arr.length; i++) {
    let red = unhex(arr[i].substr(0, 2));
    let green = unhex(arr[i].substr(2, 2));
    let blue = unhex(arr[i].substr(4, 2));
    colorMode(RGB, 255, 255, 255);
    let c = color(red, green, blue);
    let h = hue(c);
    let s = saturation(c);
    let b = brightness(c);
    let t = 100 * 3 / 4;
    colorMode(HSB, 360, 100, 100, 100);
    c = color(h, s, b, t);
    arr[i] = c;
  }
  return arr;
}
