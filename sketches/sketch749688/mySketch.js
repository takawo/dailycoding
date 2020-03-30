let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let pallete = ["#020205", "#EFAB01", "#DF160F", "#013464", "#CBA450", "#D03F20", "#CDB587", "#5C2E21"];
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  let bgNum = int(random(pallete.length));
  background(pallete[bgNum]);
  pallete.splice(bgNum, 1);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);

  cells = int(random(3, 10));
  cols = cells;
  rows = cells;

  offset = width / 10;
  margin = offset / 5;

  let w = sqrt(sq(width / 2) + sq(height / 2));

  cellW = (w * 2 + offset * 2 - margin * (cols - 1)) / cols;
  cellH = (w * 2 + offset * 2 - margin * (rows - 1)) / rows;
  angleMode(DEGREES);
  strokeJoin(ROUND);
  push();
  translate(width / 2, height / 2);
  rotate(45 + int(random(4)) * 360 / 4);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, -w - offset, w + offset - cellW);
      let y = map(j, 0, rows - 1, -w - offset, w + offset - cellW);
      let arr = [];
      push();
      translate(x, y);
      let rMax = cellW / sqrt(3)*0.9;
      recursiveTriangles(arr, 0, int(random(2, 4)), rMax);
      pop();
    }
  }
  pop();
  image(graphics, 0, 0);
}


function recursiveTriangles(arr, depth, max, rMax = width / 2) {
  noStroke();
  if (depth > max) {
    let p1 = arr[0];
    let p2 = arr[1];
    let p3 = arr[2];
    let p4 = p5.Vector.lerp(p1,p2,0.5);
    let centroid = p5.Vector.lerp(p3,p4,2/3);
    let num = int(random(2,5))*10;
    let c1 = color(random(pallete));
    let c2 = c1;
    while(c1 == c2){
      c2 = color(random(pallete));
    }
    for(let i = 1; i >0; i -= 1/num){
      colorMode(RGB,255,255,255,255);
      fill(lerpColor(c1,c2,i));
      beginShape();
      for(let pp of arr){
        let p = p5.Vector.lerp(centroid,pp,i);
        vertex(p.x,p.y);
      }
      endShape(CLOSE);
      colorMode(HSB,360,100,100,100);
    }
    return;
  }
  if (depth == 0) {
    let r = rMax;
    let startAngle = int(random(12)) * 360/12;
    for (let angle = startAngle; angle < 360 + startAngle; angle += 360 / 3) {
      let x = cos(angle) * r;
      let y = sin(angle) * r;
      arr.push(createVector(x, y));
    }
    noStroke();
  }
  let target = int(random(arr.length));
  let next = (target + 1) % arr.length;
  let current = p5.Vector.lerp(arr[target], arr[next], 0.5);
  triangle(arr[target].x, arr[target].y, arr[(next + 1) % arr.length].x, arr[(next + 1) % arr.length].y, current.x, current.y);
  recursiveTriangles([arr[target], arr[(next + 1) % arr.length], current], depth + 1, max);
  triangle(arr[next].x, arr[next].y, arr[(next + 1) % arr.length].x, arr[(next + 1) % arr.length].y, current.x, current.y);
  recursiveTriangles([arr[next], arr[(next + 1) % arr.length], current], depth + 1, max);
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