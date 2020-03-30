let url = "https://coolors.co/app/6699cc-fff275-ff8c42-ff3c38-a23e48";
let pallete = [];
let graphics, bc,sc;

let model;
let previous_pen = 'down';
let pen;
let strokePath;
let n = 0;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  model = ml5.sketchRNN('cat', modelReady);
  init();
}

function init(){
  pallete = createPallete(url);
  let bn = int(random(pallete.length));
  bc = pallete[bn]
  pallete.splice(bn, 1);
  let sn = int(random(pallete.length));
  sc = pallete[sn]
  pallete.splice(sn, 1);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(50000, graphics);
}

function startDrawing() {
  background(bc);
  image(graphics,0,0);  
  let x = width / 2;
  let y = height / 2;
  pen = createVector(x, y);
  model.reset();
  model.generate(gotStroke);
}

function draw() {
  if (strokePath) {
    if (previous_pen == 'down') {
      stroke(sc);
      strokeCap(ROUND);
      strokeJoin(ROUND);
      strokeWeight(3.0);
      line(pen.x, pen.y, pen.x + strokePath.dx, pen.y + strokePath.dy);
    }
    pen.x += strokePath.dx;
    pen.y += strokePath.dy;
    previous_pen = strokePath.pen;

    if (strokePath.pen !== 'end') {
      strokePath = null;
      model.generate(gotStroke);
    } else {
      n += 1 / 50;
      if (n > 1) {
        init();
        startDrawing();
        n = 0;
      }
    }
  }
}

function gotStroke(err, s) {
  strokePath = s;
}

function modelReady() {
  startDrawing();
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

function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 100, 5);
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