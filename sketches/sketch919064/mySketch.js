let url = "https://coolors.co/ff99c8-fcf6bd-d0f4de-a9def9-e4c1f9";
let palette = createPalette(url);
let animations;

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  init();
}

function init() {
  let offset = width / 10;
  let x = offset;
  let y = offset;
  let w = width - offset * 2;
  let h = height - offset * 2;
  animations = [];
  separateGrid(0, 0, width);

}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 5) {
        separateGrid(i, j, w);
      } else {
        let o = w / 10;
        animations.push(new Animation(i + o, j + o, w - o * 2, w - o * 2, shuffle(palette.concat())));
      }
    }
  }
}

function draw() {
  background(0, 0, 100);
  for (let animation of animations) {
    animation.draw();
  }
  if (frameCount % 333 == 0) {
    init();
  }
}

class Animation {
  constructor(x, y, w, h, colors) {
    this.cx = x + w / 2;
    this.cy = y + h / 2;
    this.angle = int(random(4)) * 360 / 4;
    this.w = w;
    this.h = h;
    this.deltatime = 0;
    this.targetW = random(this.w);
    this.k = int(random(8, 12));
    this.isEven = random(100) > 50;
    this.colors = colors;
    this.c1 = this.colors[0];
    this.c2 = this.colors[1];
  }
  draw() {
    let deltaTime = 1.0 / 120.0;
    this.targetW = lerp(this.w, this.targetW, exp(-this.k * deltaTime));
    // print(this.targetW);

    push();
    drawingContext.shadowColor = color(0, 0, 0, 25);
    drawingContext.shadowBlur = min(this.w, this.h) / 5;
    rectMode(CENTER);
    noStroke();
    rect(this.cx, this.cy, this.w, this.h);
    pop();


    push();
    translate(this.cx, this.cy);


    rotate(this.angle);
    if (this.angle % 180 != 0) {
      let temp = this.w;
      this.w = this.h;
      this.h = temp;
    }
    translate(-this.w / 2, -this.h / 2);
    noStroke();
    if (this.isEven) {
      fill(this.c1);
    } else {
      fill(this.c2);
    }
    rect(this.targetW, 0, this.w - this.targetW, this.h);
    if (this.isEven) {
      fill(this.c2);
    } else {
      fill(this.c1);
    }
    rect(this.targetW, 0, -this.targetW, this.h);
    pop();
    if (this.w - this.targetW < 1) {
      let newAngle = this.angle;
      while (this.angle == newAngle) {
        this.angle = int(random(4)) * 360 / 4;
      }
      this.k = int(random(8, 12));
      this.targetW = 0;
      this.isEven = !this.isEven;
      if (this.isEven) {
        let prev_c = this.c2;
        let c = random(palette);
        while (prev_c == c || c == this.c1) {
          c = random(palette);
        }
        this.c2 = c;
      } else {
        let prev_c = this.c1;
        let c = random(palette);
        while (prev_c == c || c == this.c2) {
          c = random(palette);
        }
        this.c1 = c;

      }
    }
  }
}


function createPalette(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}