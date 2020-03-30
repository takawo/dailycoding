//reference @nasana_x's awesome random 'arc' walk. https://twitter.com/nasana_x/status/1222141813135265794

let movers = [];
let pallete = [];
let url = "https://coolors.co/app/ffcd38-f2816a-71dcdd-2d557f-f7ede2";
let graphics;
let patternGraphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  pallete = createPallete(url);

  patternGraphics = createGraphics(width,height);
  patternGraphics.angleMode(DEGREES);
  for (let i = 0; i < 10; i++) {
    let m = new Mover(0,0, width / 10,pallete.concat(),patternGraphics);
    movers.push(m);
  }
  
  graphics = createGraphics(width,height);
  graphics.colorMode(HSB,360,100,100,100);
  graphics.noStroke();
  graphics.fill(0,0,100,8);
  for(let i = 0; i< width * height * 10/100; i++){
    let x = random(width);
    let y = random(height);
    let w = random(2);
    let h = random(2);
    graphics.ellipse(x,y,w,h);
  }  
  
  
  
}

function draw() {
  background(0,0,10);
  patternGraphics.push();
  patternGraphics.translate(width/2,height/2);
  patternGraphics.rotate(45);
  for(let m of movers){
  m.update();
  m.display();
  }
  patternGraphics.pop();
  image(patternGraphics,0,0);
  image(graphics,0,0);
}


class Mover {
  constructor(cx, cy, r,colors,g) {
    this.g = g;
    this.center = createVector(cx, cy);
    this.r = r;
    this.angle = int(random(4)) * 360 / 4;
    this.angleStep = 90 / (int(random(50, 30)));
    this.colors = colors;
    this.fillColor = random(colors);
  }

  update() {
    this.angle = int(this.angle + this.angleStep);

    if (int(this.angle) % 90 == 0) {
      this.angleStep = 90 / (int(random(50, 30)));
      let pivotX = this.center.x + cos(this.angle) * this.r;
      let pivotY = this.center.y + sin(this.angle) * this.r;
      let angle = int(random(4)) * 360 / 4 - 180;
      this.center = createVector(pivotX + cos(-this.angle + angle) * this.r,
        pivotY + sin(-this.angle + angle) * this.r);
      this.angle = atan2(pivotY - this.center.y, pivotX - this.center.x);
    this.fillColor = random(this.colors);
      if(random(100) <10){
        this.center = createVector(0,0);      
      }
    }
  }

  display() {

    this.g.noStroke();
    this.g.fill(this.fillColor);
    this.g.arc(this.center.x, this.center.y, this.r * 2, this.r * 2, this.angle, this.angle + this.angleStep, PIE);

  }
}

function createPallete(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i] + hex(50,2);
  }
  return arr;
}
