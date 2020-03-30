let pallete = ["#020205", "#EFAB01", "#DF160F", "#013464", "#CBA450", "#D03F20", "#CDB587", "#5C2E21"];
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);
  
  background(20);
  push();
  translate(width / 2, height / 2);
  rotate(random(360));
  let step = 10;
  for(let i = 0; i < step; i ++){
  colors = pallete.concat();
  let r = map(i,0,step,width / 2 * 0.85,width/2*0.1);
  let points = [];
  for (let angle = 0; angle < 360; angle += 360 / 3) {
    let colorNum = int(random(colors.length));
    let color = colors[colorNum];
    colors.splice(colorNum,1);
    let p = new Point(cos(angle) * r, sin(angle) * r, color);
    p.display();
    points.push(p);
  }
  for (let i = 0; i < points.length; i++) {
    let current = points[i];
    let next = points[(i + 1) % points.length];
    Point.drawLine(current, next);
  }
  }
  pop();
  image(graphics,0,0);
}

class Point {
  constructor(x, y, c) {
    this.pos = createVector(x, y);
    this.color = color(c);
    this.size = 10;
  }
  display() {
    fill(this.color);
    noStroke();
    circle(this.pos.x, this.pos.y, 10);
  }
  static drawLine(p1, p2) {
    let step = 1 / 100;
    for (let i = 0; i < 1-step; i += step) {
      let mp1 = p5.Vector.lerp(p1.pos, p2.pos, i);
      let mp2 = p5.Vector.lerp(p1.pos, p2.pos, i + step);
			colorMode(RGB);
      let mc = lerpColor(p1.color, p2.color, i);
			colorMode(HSB,360,100,100,100);
      stroke(mc);
      strokeWeight(p1.size);
      line(mp1.x, mp1.y, mp2.x, mp2.y);
    }
  }
}


function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 100, 7);
  for (let i = 0; i < _n; i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(c);
    _graphics.ellipse(x, y, w, h);
  }
}