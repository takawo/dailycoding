let pallete = ["#000765", "#000E9D", "#0014D9", "#F93C00", "#118DC3", "#3C1B1D", "#195DAE"];
let min_margin;
const offset = 40;
let cells = 5;
const margin = 200/cells;
const cols = cells;
const rows = cells;
let sw;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB,360,100,100,100);
  angleMode(DEGREES);
	
  sw = map(max(cols,rows),2,10,10,1);
}

function draw() {
  background("#FAFBFD");
  drawBackgroundNoise(30000);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
			min_margin = random(1/5-1/8,1/2- 1/10);
      let w = (width - offset * 2 - margin * (cols - 1)) / cols;
      let h = (height - offset * 2 - margin * (rows - 1)) / rows;
      let x = map(i, 0, cols - 1, offset, width - offset - w) + w / 2;
      let y = map(j, 0, rows - 1, offset, height - offset - h) + h / 2;
      push();
      translate(x, y);
      let rotate_num = int(random(4));
      rotate(rotate_num * 90);
      if (rotate_num % 2 == 1) {
        let temp = w;
        w = h;
        h = temp;
      }
      let points = [];
      points.push(createVector(-w / 2, -h / 2));
      points.push(createVector(w / 2, -h / 2));
      points.push(createVector(w / 2, h / 2));
      points.push(createVector(-w / 2, h / 2));
      drawRectShadow(-w/2,-h/2,w,h);
      drawSeparatedRect(points, int(random(1,4)));
      pop();
    }
  }
  noLoop();

}


function drawSeparatedRect(_points, _depth) {

  if (_depth < 0) {
    return;
  }
  let n = _depth % _points.length;
  let m = int(n + _points.length / 2) % _points.length;
  let n_f = random(min_margin, 1 - min_margin);
  let m_f = random(min_margin, 1 - min_margin);
  let n_next = (n + 1) % _points.length;
  let m_next = (m + 1) % _points.length;
  let p3 = p5.Vector.lerp(_points[n], _points[n_next], n_f);
  let p4 = p5.Vector.lerp(_points[m], _points[m_next], m_f);
  stroke(0,0,100);
  strokeWeight(sw);
  //fill(0,0,100);
  fill(pallete[int(abs(p4.x + p4.y) * 333) % pallete.length]);
  quad(p3.x, p3.y, p4.x, p4.y, _points[m_next].x, _points[m_next].y, _points[n].x, _points[n].y);
  fill(pallete[int(abs(p3.x + p3.y) * 3) % pallete.length]);
  quad(p4.x, p4.y, p3.x, p3.y, _points[n_next].x, _points[n_next].y, _points[m].x, _points[m].y);

  let pointsA = [p3, p4, _points[m_next], _points[n]];
  drawSeparatedRect(pointsA, _depth - 1);
  let pointsB = [p4, p3, _points[n_next], _points[m]];
  drawSeparatedRect(pointsB, _depth - 1);
}

function drawRectShadow(x, y, w, h, n = margin*1.3) {
	rectMode(CENTER);
  push();
  translate(x+w/2,y+h/2);
  for(let i = n; i > 0; i--){
  noFill();
  let t = map(i,n,0,0,3.8);
  stroke(0,0,0,t*t);
  rect(0,0,w+i,h+i,5);
  }
  pop();  
  rectMode(CORNER);
}

function drawBackgroundNoise(_n) {
  for (let i = 0; i < _n; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let w = random(1, 3);
    let h = random(1, 3);
    noStroke();
    fill(0, 0, 50, random(15,5));
    ellipse(x, y, w, h);
  }
}
