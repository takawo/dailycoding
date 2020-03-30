let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  graphics = createGraphics(width,height);
  graphics.colorMode(HSB,360,100,100,100);
  graphics.stroke(0,0,100,3);
  for(let i = 0; i < width * height * 10/100; i++){
    graphics.strokeWeight(2);
    graphics.point(random(width),
                   random(height));
  }
}

function draw() {
  background(0, 0, 95);
  separateGrid(0, 0, width);
  image(graphics,0,0);
  frameRate(1);
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 10 && d > width / 15) {
        separateGrid(i, j, w);
      } else {
        let humanFace;
        let b = new Bound(i, j, w, w);
        humanFace = new HumanFace(b);
        humanFace.draw();
        //				rect(i,j,w,w);
      }
    }
  }
}
class HumanFace {
  constructor(b) {
    let skinColors = ["#8d5524", "#c68642", "#e0ac69", "#f1c27d", "#ffdbac"];
    this.bound = b;
    this.graphics = createGraphics(this.bound.w, this.bound.h);
    this.graphics.colorMode(HSB, 360, 100, 100, 100);
    this.graphics.angleMode(DEGREES);
    this.randomSeed = random(10000);
    this.w, this.h;
    this.skinColor = color(random(skinColors));
    this.darkarColor = color(hue(this.skinColor),
      constrain(saturation(this.skinColor) + 20, 0, 100),
      constrain(brightness(this.skinColor) - 15, 0, 100));
    this.outLine = 0;
    this.eyes = int(random(4));
    this.nose = int(random(4));
    int(random(4));
    this.neck = 0;
    this.mouth = 0;
    this.body = 0;
    this.faceColor = int(random(4));
  }
  draw() {
    randomSeed(this.randomSeed);
    //this.graphics.background(random(360),80,80);
    this.drawBackHair();
    this.drawBody();
    this.drawNeck();
    this.drawOutLine();
    this.drawEyes();
    this.drawNose();
    this.drawMouth();
    this.drawFrontHair();
    image(this.graphics, this.bound.x, this.bound.y);
  }
  drawOutLine() {
    let w = this.graphics.width * (0.6 + random(-2, 2) * 0.05);
    let h = this.graphics.height * (0.6 + random(-2, 2) * 0.05);

    this.w = w;
    this.h = h;
    this.drawEar();
    this.graphics.push();
    this.graphics.translate(this.graphics.width / 2, this.graphics.height / 2);
    this.graphics.rectMode(CENTER);
    switch (this.outLine) {
      case 0:
        this.graphics.noStroke();
        this.graphics.fill(this.skinColor);
        let top = max(w, h) / int(random(0, 3));
        let bottom = max(w, h) / int(random(0, 3));
        this.graphics.rect(0, 0, w, h, top, top, bottom, bottom);
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
    this.graphics.pop();
  }
  drawEyes() {
    this.graphics.push();
    this.graphics.translate(this.graphics.width / 2, this.graphics.height / 2);
    let ex = map(int(random(-3, 4)), -3, 3, this.graphics.width / 32, -this.graphics.height / 32);
    let ey = map(int(random(-3, 4)), -3, 3, this.graphics.height / 32, -this.graphics.height / 32);
    this.graphics.translate(0, ey);
    let d = this.bound.w / (int(random(2, 5)) * 5) * 2;
    let dd = d / 2;
    switch (this.eyes) {
      case 0:
        this.graphics.push();
        this.graphics.translate(this.w / 4 + ex, 0);
        this.graphics.fill(0, 0, 100);
        this.graphics.noStroke();
        this.graphics.circle(0, 0, this.bound.w / 8);
        this.graphics.fill(0, 0, 20);
        this.graphics.noStroke();
        this.graphics.circle(0, 0, this.bound.w / 16);
        this.graphics.fill(0, 0, 100, 80);
        this.graphics.circle(this.bound.w / 12 / 6, -this.bound.w / 12 / 6, this.bound.w / 12 / 4);

        this.graphics.pop();
        this.graphics.push();
        this.graphics.translate(-this.w / 4 - ex, 0);
        this.graphics.fill(0, 0, 100);
        this.graphics.noStroke();
        this.graphics.circle(0, 0, this.bound.w / 8);
        this.graphics.fill(0, 0, 20);
        this.graphics.noStroke();
        this.graphics.circle(0, 0, this.bound.w / 16);
        this.graphics.fill(0, 0, 100, 80);
        this.graphics.circle(this.bound.w / 12 / 6, -this.bound.w / 12 / 6, this.bound.w / 12 / 4);
        this.graphics.pop();
        break;
      case 1:
        this.graphics.push();
        this.graphics.translate(this.w / 4 + ex, 0);
        this.graphics.fill(0, 0, 100);
        this.graphics.noStroke();
        this.graphics.arc(0, 0, d, d, 0, 180);
        this.graphics.fill(0, 0, 20);
        this.graphics.noStroke();
        this.graphics.arc(0, 0, dd, dd, 0, 180);
        this.graphics.fill(0, 0, 100,80);
        this.graphics.noStroke();
        this.graphics.circle(cos(45)*dd/3,sin(45)*dd/3,this.bound.w / 64);        this.graphics.pop();
        this.graphics.push();
        this.graphics.translate(-this.w / 4 - ex, 0);
        this.graphics.fill(0, 0, 100);
        this.graphics.noStroke();
        this.graphics.arc(0, 0, d, d, 0, 180);
        this.graphics.fill(0, 0, 20);
        this.graphics.noStroke();
        this.graphics.arc(0, 0, dd, dd, 0, 180);
        this.graphics.fill(0, 0, 100,80);
        this.graphics.noStroke();
        this.graphics.circle(cos(45)*dd/3,sin(45)*dd/3,this.bound.w / 64);               this.graphics.pop();
        break;
      case 2:
        this.graphics.push();
        this.graphics.translate(this.w / 4 + ex, 0);
        this.graphics.fill(0, 0, 20);
        this.graphics.noStroke();
        this.graphics.circle(0, 0, this.bound.w / 12);
        this.graphics.fill(0, 0, 100, 80);
        this.graphics.circle(this.bound.w / 12 / 6, -this.bound.w / 12 / 6, this.bound.w / 12 / 3);
        this.graphics.pop();
        this.graphics.push();
        this.graphics.translate(-this.w / 4 - ex, 0);
        this.graphics.fill(0, 0, 20);
        this.graphics.noStroke();
        this.graphics.circle(0, 0, this.bound.w / 12);
        this.graphics.fill(0, 0, 100, 80);
        this.graphics.circle(this.bound.w / 12 / 6, -this.bound.w / 12 / 6, this.bound.w / 12 / 3);
        this.graphics.pop();
        break;
      case 3:
        this.graphics.push();
        this.graphics.translate(this.w / 4 + ex, 0);
        this.graphics.fill(0, 0, 20);
        this.graphics.noStroke();
        this.graphics.circle(0, ey * 1.5, this.bound.w / 15);
        this.graphics.circle(0, -ey * 1.5, this.bound.w / 15);
        this.graphics.rectMode(CENTER);
        this.graphics.rect(-this.bound.w / 15 / 4, 0, this.bound.w / 15 / 2, ey * 2.5);
        this.graphics.fill(0, 0, 100, 80);
        this.graphics.circle(cos(-45)*this.w/45, -abs(ey) * 1.5+sin(-45)*this.w/45, this.bound.w / 12 / 4);
        
        this.graphics.pop();
        this.graphics.push();
        this.graphics.translate(-this.w / 4 - ex, 0);
        this.graphics.fill(0, 0, 20);
        this.graphics.noStroke();
        this.graphics.circle(0, ey * 1.5, this.bound.w / 15);
        this.graphics.circle(0, -ey * 1.5, this.bound.w / 15);
        this.graphics.rectMode(CENTER);
        this.graphics.rect(-this.bound.w / 15 / 4, 0, this.bound.w / 15 / 2, ey * 2.5);
        this.graphics.fill(0, 0, 100, 80);
        this.graphics.circle(cos(-45)*this.w/45, -abs(ey) * 1.5+sin(-45)*this.w/45, this.bound.w / 12 / 4);
        this.graphics.pop();
        break;
      case 4:
        this.graphics.push();
        this.graphics.translate(this.w / 4 + ex, 0);
        this.graphics.fill(0, 0, 20);
        this.graphics.noStroke();
        this.graphics.sq(this.bound.w / 15);
        this.graphics.circle(0, -ey * 1.5, this.bound.w / 15);
        this.graphics.rectMode(CENTER);
        this.graphics.rect(-this.bound.w / 15 / 4, 0, this.bound.w / 15 / 2, ey * 2.5);
        this.graphics.pop();
        break;
    }
    this.graphics.pop();
  }
  drawNose() {
    this.graphics.push();
    this.graphics.translate(this.graphics.width / 2, this.graphics.height / 2);
    let ny = map(int(random(-3, 4)), -3, 3, this.h / 32, this.h / 16);
    this.graphics.translate(0, ny);
    switch (this.nose) {
      case 0:
        this.graphics.push();
        this.graphics.translate(0, ny);
        this.graphics.fill(this.darkarColor);
        this.graphics.noStroke();
        this.graphics.circle(0, 0, this.graphics.width / 20);
        this.graphics.pop();
        break;
      case 1:
        this.graphics.push();
        this.graphics.translate(0, ny);
        this.graphics.fill(this.darkarColor);
        this.graphics.noStroke();
        this.graphics.circle(this.graphics.width / 50, 0, this.graphics.width / 60);
        this.graphics.circle(-this.graphics.width / 50, 0, this.graphics.width / 60);
        this.graphics.pop();
        break;
      case 2:
        this.graphics.push();
        this.graphics.translate(0, ny);
        this.graphics.fill(this.darkarColor);
        this.graphics.noStroke();
        this.graphics.rectMode(CENTER);
        this.graphics.rect(0, 0, this.graphics.width / random(20, 30), this.graphics.height / 10, this.graphics.width / 10);
        this.graphics.rect(0, this.graphics.height / 60, this.graphics.width / random(8, 15), this.graphics.height / 30, this.graphics.width / 10);
        this.graphics.pop();
        break;
      case 3:
        break;
    }
    this.graphics.pop();
  }

  drawEar() {
    this.graphics.push();
    this.graphics.translate(this.graphics.width / 2, this.graphics.height / 2);
    this.graphics.push();
    this.graphics.translate(this.w / 2, 0);
    this.graphics.fill(this.skinColor);
    this.graphics.noStroke();
    this.graphics.circle(0, 0, this.bound.w / 8);
    this.graphics.fill(this.darkarColor);
    this.graphics.noStroke();
    this.graphics.circle(0, 0, this.bound.w / 16);
    this.graphics.pop();
    this.graphics.push();
    this.graphics.translate(-this.w / 2, 0);
    this.graphics.fill(this.skinColor);
    this.graphics.noStroke();
    this.graphics.circle(0, 0, this.bound.w / 8);
    this.graphics.fill(this.darkarColor);
    this.graphics.noStroke();
    this.graphics.circle(0, 0, this.bound.w / 16);
    this.graphics.pop();
    this.graphics.pop();
  }
  drawMouth() {
    this.graphics.push();
    this.graphics.translate(this.graphics.width / 2, this.graphics.height / 2);
    this.graphics.push();
    let my = map(random(4), 0, 4, this.h / 3, this.h / 4);
    this.graphics.translate(0, my);

    switch (int(random(4))) {
      case 0:
        this.graphics.fill(0, 0, 20);
        this.graphics.noStroke();
        this.graphics.circle(0, 0, this.w / 10);
        break;
      case 1:
        this.graphics.fill(0, 0, 20);
        this.graphics.noStroke();
        this.graphics.arc(0, 0, this.w / 4, this.w / 4, 0, 180);
        break;
      case 2:
        this.graphics.fill(0, 0, 20);
        this.graphics.noStroke();
        this.graphics.rectMode(CENTER);
        this.graphics.rect(0, 0, this.w / 3, this.h / 10, this.w / 3);
        break;
      case 3:
        this.graphics.fill(0, 0, 20);
        this.graphics.noStroke();
        this.graphics.arc(0, this.w / 4 / 2, this.w / 4, this.w / 4, 180, 360);
        break;
    }
    this.graphics.pop();
    this.graphics.pop();
  }
  drawNeck() {
    this.graphics.fill(this.darkarColor);
    this.graphics.noStroke();
    this.graphics.rectMode(CENTER);
    this.graphics.rect(this.graphics.width / 2, this.graphics.height * .7,
      this.graphics.width / 10,
      this.graphics.height * 0.4,
      this.graphics.width / 2
    );
  }
  drawBody() {
    this.graphics.fill(0, 0, random(80));
    this.graphics.noStroke();
    let d = map(random(4), 0, 4, this.graphics.width / 2, this.graphics.width / 1.5);
    if (random(100) < 30) {
      this.graphics.arc(this.graphics.width / 2, this.graphics.height, d, d, 180, 360);
    } else {
      this.graphics.rectMode(CENTER);
      this.graphics.rect(this.graphics.width / 2, this.graphics.height, d * 0.8, -d * 0.6, d / 3);
    }
  }
  drawFrontHair() {
    this.graphics.push();
    this.graphics.translate(this.graphics.width / 2, this.graphics.height / 2);

    switch (int(random(4))) {
      case 0:
        this.graphics.push();
        this.graphics.translate(-this.w / 2, -this.h * 2 / 3);
        let rate = random(3, 7) / 10;
        this.graphics.rectMode(CORNER);
        this.graphics.fill(0, 0, 20);

        this.graphics.rect(0, 0, this.w * rate + 1, this.h / 2, this.w, 0, this.w, 0);
        this.graphics.rect(this.w * rate - 1, 0, this.w * (1 - rate), this.h / 2, 0, this.w, 0, this.w);
        this.graphics.pop();
        break;
      case 1:
        this.graphics.push();
        this.graphics.translate(-this.w / 2, -this.h * 0.6);
        this.graphics.rectMode(CORNER);
        this.graphics.fill(0, 0, 20);
        let hh = this.h * 0.4;
        let iStep = int(random(4,10));
        for (let i = 0; i < .9; i += 1/iStep) {
          this.graphics.rect(i * this.w, hh/4, this.w * 1 / iStep + 1, hh, this.w);
        }
        this.graphics.rect(0,hh/4,this.w,this.h/8, this.w);
        this.graphics.pop();
        break;
      case 2:
        //later
        // this.graphics.push();
        // this.graphics.fill(0, 0, 20);
        // //this.graphics.rect(0, -this.h / 8, this.w * 1.1, this.w * 1.1, this.w, this.w, 0, 0);
        //this.graphics.pop();
        break;
    }

    this.graphics.pop();
  }
  drawBackHair() {
    if (random(100) > 50) {
      return;
    }
    this.graphics.push();
    this.graphics.translate(this.graphics.width / 2, this.graphics.height / 2);
    this.graphics.push();
    this.graphics.rotate(int(random(12)) * 360 / 12);
    let my = map(random(4), 0, 4, this.h / 3, this.h / 4);
    this.graphics.translate(0, my);
    let angleStep = 360 / int(random(1, 8));
    let r = map(random(4), 0, 4, this.graphics.width / 4, this.graphics.width / 3);
    let d = map(random(4), 0, 4, this.graphics.width / 5, this.graphics.width / 3);
    this.graphics.fill(0, 0, 20);
    this.graphics.noStroke();

    for (let angle = 0; angle < 360; angle += angleStep) {
      let x = cos(angle) * r;
      let y = sin(angle) * r;
      this.graphics.circle(x, y, d);
    }
    this.graphics.pop();
    this.graphics.pop();
  }
}

class Bound {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}