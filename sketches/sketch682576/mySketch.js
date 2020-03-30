const cols = 8;
const rows = 8;
const offset = 40;
let w, h;

function setup() {
  createCanvas(800, 800);
	
  angleMode(DEGREES);

  w = (width - offset * 2) / cols;
  h = (height - offset * 2) / rows;
}

function draw() {
  background(220);
  for (let y = offset; y < height - offset; y += h) {
    for (let x = offset; x < width - offset; x += w) {
      push();
      translate(x, y);
      drawRandomShape(w, h);
      pop();
    }
  }
  noLoop();
}

function drawRandomShape(_w, _h) {
  rect(0, 0, _w, _h);
  let n = floor(random(4));
  switch (n) {
    case 0:
      drawArcQuarter(_w, _h, (_w + _h) / 2);
      break;
    case 1:
      drawArcHalf(_w, _h, (_w + _h) / 2);
      break;
    case 2:
      drawDiagonalLine(_w, _h);
      break;
    case 3:
      drawSplitLine(_w, _h);
      break;

  }
}

function drawDiagonalLine(_w, _h) {
  let m = floor(random(4));
  let n = floor(random(2));
  push();
  translate(_w / 2, _h / 2);
  rotate(m * 90);
  if (n == 0) {
    line(-w / 2, -h / 2, w / 2, h / 2);
  } else {
    line(w / 2, -h / 2, 0, h / 2);
  }
  pop();
}

function drawSplitLine(_w, _h) {
  let m = floor(random(4));
  let n = floor(random(2));
  push();
  translate(_w / 2, _h / 2);
  rotate(m * 90);
  line(-w / 2, 0, w / 2, 0);
  
  if(n < 0.5){
  for(let x = -w/2; x <w/2; x += w / 10){
  	line(x,0,x,h/2);
  } 
  
  }
  
  
  
  pop();

}


function drawArcHalf(_w, _h, _d) {
  let m = floor(random(4));
  let sAngle = m * 90;
  let eAngle = sAngle + 180;
  let x0 = _w / 2;
  let y0 = _h / 2;
  push();
  translate(x0, y0);
  noFill();
  arc(0, 0, _d, _d, sAngle, eAngle);



  pop();
}

function drawArcQuarter(_w, _h, _d) {
  let m = floor(random(4));
  let sAngle;
  let eAngle;
  let x0;
  let y0;
  push();
  switch (m) {
    case 0:
      sAngle = 0;
      eAngle = 90;
      x0 = 0;
      y0 = 0;
      noFill();
      arc(x0, y0, _d * 2, _d * 2, sAngle, eAngle);
      break;
    case 1:
      sAngle = 90;
      eAngle = 180;
      x0 = _w;
      y0 = 0;
      noFill();
      arc(x0, y0, _d * 2, _d * 2, sAngle, eAngle);
      break;
    case 2:
      sAngle = 180;
      eAngle = 270;
      x0 = _w;
      y0 = _h;
      noFill();
      arc(x0, y0, _d * 2, _d * 2, sAngle, eAngle);
      break;
    case 3:
      sAngle = 270;
      eAngle = 360;
      x0 = 0;
      y0 = _h;
      noFill();
      arc(x0, y0, _d * 2, _d * 2, sAngle, eAngle);
      break;
  }

  let isHorizontal = random(100) < 50 ? true : false;
  for (let angle = sAngle; angle < eAngle; angle += 5) {
    let x1 = x0 + cos(angle) * _d;
    let y1 = y0 + sin(angle) * _d;
    let x2;
    let y2;
    switch (m) {
      case 0:
        if (isHorizontal) {
          x2 = _d;
          y2 = y1;
        } else {
          x2 = x1;
          y2 = _d;
        }
        break;
      case 1:
        if (isHorizontal) {
          x2 = 0;
          y2 = y1;
        } else {
          x2 = x1;
          y2 = _d;
        }
        break;
      case 2:
        if (isHorizontal) {
          x2 = 0;
          y2 = y1;
        } else {
          x2 = x1;
          y2 = 0;
        }
        break;
      case 3:
        if (isHorizontal) {
          x2 = _d;
          y2 = y1;
        } else {
          x2 = x1;
          y2 = 0;
        }
        break;
    }
    line(x1, y1, x2, y2);

  }


  pop();
}