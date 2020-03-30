let url = "https://coolors.co/app/13293d-006494-247ba0-1b98e0-e8f1f2";
let pallete;
let graphics;

let cells, cols, rows;
let offset, margin;
let w, h, cellW, cellH;
let prevC = -1;
let cellMax, cellMin;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  init();
}
function init() {
  pallete = createPallete(url);
  let bn = int(random(pallete.length));
  bc = pallete[bn]
  pallete.splice(bn, 1);
  background(bc);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);

  cells = int(random(10, 50));
  cols = cells;
  rows = cells;
  cellMax = cells / 5;
  cellMin = int(cells / 25 + 1);
  w = sqrt(sq(width) + sq(height));
  h = w;

  offset = 0;
  margin = w / 100;

  cellW = (w - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (h - offset * 2 - margin * (rows - 1)) / rows;

  push();
  translate(width / 2, height / 2);
  rotate(45 + int(random(4)) * 90);

  let jStep = 1;
  for (let j = 0; j < rows; j += jStep) {
    let iStep = 1;
    jStep = int(random(cellMin, cellMax));
    if (j + jStep > rows) {
      jStep = rows - j;
    }
    let ch = cellH * jStep + margin * (jStep - 1);
    for (let i = 0; i < cols; i += iStep) {
      let x = map(i, 0, cols - 1, -w / 2 + offset, w / 2 - offset - cellW);
      let y = map(j, 0, rows - 1, -h / 2 + offset, h / 2 - offset - cellH);
      iStep = int(random(cellMin, cellMax));
      if (i + iStep > cols) {
        iStep = cols - i;
      }
      let cw = cellW * iStep + margin * (iStep - 1);
      let c = getRandomColor(pallete);

      let cx = x+cw/2;
      let cy = y+ch/2;
      
      let r = max(cw,ch) / random(2.5,5);
      let r2 = max(cw,ch) / random(4,20);
      stroke(c);
      drawTwistedShape(cx,cy,r,r2,cw > ch);
    }
  }
  pop();

  image(graphics, 0, 0);
}

function drawTwistedShape(cx,cy,r,r2,isWide){
  let angle = 0;
  push();
  translate(cx, cy);
  if(isWide==false){
    rotate(90);
  }
  
  let initNum = 15;
  let angleNum = initNum / int(random(15/2,15));
  let sepNum = initNum- angleNum;
  
  let p1 = createVector(cos(angle) * r, sin(angle) * r);
  let p2 = createVector(cos(angle + 180) * r, sin(angle + 180) * r);

  for (let angle2 = -90; angle2 < 90; angle2 += 1) {
    let x1 = p1.x + cos(angle2) * r2;
    let y1 = p1.y + sin(angle2) * r2;
    let x2 = p2.x + cos(angle2 + 180) * r2;
    let y2 = p2.y + sin(angle2) * r2;
    
    let angle3 = atan2(y2-y1,x2-x1);
    let distance = dist(x1,y1,x2,y2);
    
    noFill();
    push();
    translate(x1,y1);
    rotate(angle3);
    beginShape();
    for(let x = 0; x < distance; x++){
    let y = sin(x/distance * 360*angleNum) * r2/sepNum;
      vertex(x,y);
    }
    endShape();
    pop();
  }
  pop();
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
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(c);
    _graphics.ellipse(x, y, w, h);
  }
}

function getRandomColor(_pallete) {
  let _c = prevC;
  while (_c == prevC) {
    _c = pallete[int(random(pallete.length))];
  }
  prevC = _c;
  return _c;
}