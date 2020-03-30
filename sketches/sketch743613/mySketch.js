let cells, cols, rows;
let margin, offset;
let cellW, cellH;
let graphics;
let pallete = ["#FA7912","#080604","#CE3917","#E4E3E0","#212550","#DFA55D","#4B679E"];
let bg;


function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  strokeJoin(ROUND);
  init();
}

function init() {
  cells = int(random(2, 5));
  cols = cells;
  rows = cells;

  offset = width / 10;
  margin = offset / 10;
  cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
  cellH = (height - offset * 2 - margin * (rows - 1)) / rows;
  
  let bgN = int(random(pallete.length));
  bg = pallete[bgN];
  pallete.splice(bgN,1);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);
}



function draw() {
  background(bg);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i,0,cols-1,offset,width-offset - cellW);
      let y =  map(j,0,rows-1,offset,height-offset - cellH);
      drawQuadsInQuad(x+cellW/2,y+cellH/2, cellW/2,pallete.concat());
      
    }
  }
  image(graphics,0,0);
  noLoop();
}

function drawQuadsInQuad(_x, _y, _r,_pallete) {
  let ratio = 0.85;
  let rMax = _r;
  let scN = int(random(_pallete.length));
  let sc = _pallete[scN];
  _pallete.splice(scN,1);
  push();
  translate(_x, _y);
  let pArr = [];
  for (let i = 0; i < 2; i++) {
    let points = [];
    for (let angle = 0; angle < 360; angle += 360 / 4) {
      let angle2 = angle + random(-30, 30);
      let r = random(rMax / 2, rMax);
      let x = cos(angle2) * r;
      let y = sin(angle2) * r;
      points.push(createVector(x, y));
    }
    rMax = rMax / 3;
    pArr.push(points);
  }

  for (let i = 0; i < pArr[0].length; i++) {
    
    let p1 = pArr[0][i];
    let p2 = pArr[0][(i + 1) % 4];
    let p3 = pArr[1][(i + 1) % 4];
    let p4 = pArr[1][i];
    let fcN = int(random(_pallete.length));
    let fc = _pallete[fcN];
    _pallete.splice(fcN,1);
    fill(fc);
    stroke(sc);
    quad(p1.x, p1.y,
      p2.x, p2.y,
      p3.x, p3.y,
      p4.x, p4.y);
  }
  beginShape();
  for(let p of pArr[1]){
    vertex(p.x,p.y);
  }
  endShape(CLOSE)
  pop();
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