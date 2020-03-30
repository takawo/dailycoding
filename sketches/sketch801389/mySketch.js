let scribble;
let tf;
let url = "https://coolors.co/app/ffcd38-f2816a-71dcdd-2d557f-f7ede2";
let pallete;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  pallete = createPallete(url);
  let bgNum = int(random(pallete.length));
  let bgColor = pallete[bgNum];
  pallete.splice(bgNum, 1);
  background(bgColor);

  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  bg.fill(0, 0, 100, 8);
  for (let i = 0; i < width * height * 20 / 100; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    bg.noStroke();
    bg.ellipse(x, y, w, h);
  }
  image(bg, 0, 0);


  tf = new Transformer();

  let cells = int(random(4, 8));
  let offset = width / 10;
  let margin = 0; //offset / 5;

  let d = (width - offset * 2 - margin * (cells - 1)) / cells;

  scribble = new Scribble();

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let colors = pallete.concat();

      let cx = offset + i * (d + margin) + d / 2;
      let cy = offset + j * (d + margin) + d / 2;
      tf.push();
      tf.translate(cx, cy);
      tf.rotate(int(random(4)) * 360 / 4);
      let xCoords = [];
      let yCoords = [];
      let shape_num = int(random(5));
      switch (shape_num) {
        case 0:
          for (let a = 0; a < 360; a++) {
            let x = cos(a) * d / 2;
            let y = sin(a) * d / 2;
            xCoords.push(x);
            yCoords.push(y);
          }
          break;
        case 1:
          for (let a = 0; a < 90; a++) {
            let x = -d / 2 + cos(a) * d;
            let y = -d / 2 + sin(a) * d;
            xCoords.push(x);
            yCoords.push(y);
          }
          xCoords.push(-d / 2);
          yCoords.push(-d / 2);
          break;
        case 2:
          xCoords = [-d / 2, d / 2, -d / 2];
          yCoords = [-d / 2, -d / 2, d / 2];
          break;
        case 3:
          xCoords = [-d / 2, d / 2, -d / 2, d / 2];
          yCoords = [-d / 2, -d / 2, d / 2, d / 2];
          break;
        case 4:
          xCoords = [-d / 2, d / 2, d / 2, -d / 2];
          yCoords = [-d / 2, -d / 2, d / 2, d / 2];
          break;
      }

      scribble.bowing = d/50;
      scribble.roughness = int(random(1,10)) / 10;

      let gap = d / int(random(10, 50));
      let angle = int(random(12)) * 360 / 12;
      strokeWeight(1);
      stroke(random(colors));
      scribble.scribbleFilling(xCoords, yCoords, gap, angle);

      tf.pop();
    }
  }
}

function createPallete(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}

class Transformer {
  constructor(x, y, a, s, stack) {
    this.x = x != null ? x : 0;
    this.y = y != null ? y : 0;
    this.a = a != null ? a : 0;
    this.s = s != null ? s : 1;
    this.stack = stack != null ? stack : [];
  }
  push() {
    push();
    return this.stack.push([this.x, this.y, this.a, this.s]);
  }

  pop() {
    var ref;
    pop();
    return ref = this.stack.pop(), this.x = ref[0], this.y = ref[1], this.a = ref[2], this.s = ref[3], ref;
  }

  rotate(da) {
    rotate(da);
    return this.a += da;
  }

  scale(ds) {
    scale(ds);
    return this.s *= ds;
  }

  translate(dx, dy) {
    translate(dx, dy);
    this.x += this.s * dx * cos(this.a) - this.s * dy * sin(this.a);
    return this.y += this.s * dy * cos(this.a) + this.s * dx * sin(this.a);
  }
}