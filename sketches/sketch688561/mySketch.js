let pallete = [];
const offset = 40;
const margin = offset / 1.5;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  noLoop();
  background(0, 0, 100);
  drawBackgroundNoise(30000);
  const cells = int(random(2, 6));
  const rows = cells;
  const cols = cells;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let w = (width - offset * 2 - margin * (cols - 1)) / cols;
      let h = (height - offset * 2 - margin * (rows - 1)) / rows;

      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);

      let colorNum = int(random(3, 6));

      pallete = makeColorPallete(colorNum);
			blendMode(NORMAL);
      drawRectShadow(x,y,w,h);      
      drawSeparatedRect(x, y, w, h, colorNum, pallete);
      blendMode(ADD);
      drawNoise(x, y,w,h,500 *colorNum ,color(0,0,100,2));
    }
  }
  //saveCanvas("output.png");
}

function drawSeparatedRect(_x, _y, _w, _h, _num, _pallete) {
  //randomSeed(22);
  push();
  translate(_x + _w / 2, _y + _h / 2);
  let points = [];
  for (let i = 0; i < 4; i++) {
    let angle = 45 + i * 90;
    let r = sqrt(sq(_w / 2) + sq(_h / 2));
    let x = cos(angle) * r;
    let y = sin(angle) * r;
    points.push(createVector(x, y));
  }
  beginShape();
  for (let p of points) {
    vertex(p.x, p.y);
  }
  endShape(CLOSE);

  let sepArr = [];
  let sepNum = 0;
  let sepSum = 0;
  for (let i = 0; i < _num; i++) {
    let sep = int(random(1, 5));
    sepArr.push(sep);
    sepSum += sep;
  }

  let startNum = random();
  let endNum = startNum + points.length;

  let i = 0;
  while (startNum < endNum) {
    let step = points.length * sepArr[i] / sepSum;
    let p1 = p5.Vector.lerp(points[int(startNum) % points.length], points[int(startNum + 1) % points.length], startNum % 1);
    let p2 = p5.Vector.lerp(points[int(startNum + step) % points.length], points[int(step + startNum + 1) % points.length], (step + startNum) % 1);
    fill(_pallete[i % pallete.length]);
    stroke(0, 0, 100);
    strokeWeight(5);
    strokeJoin(ROUND);
    beginShape();
    vertex(p1.x, p1.y);
    if (startNum + step > int(startNum + 1)) {
      vertex(points[int(startNum + 1) % points.length].x, points[int(startNum + 1) % points.length].y);
    }
    if (startNum + step > int(startNum + 2)) {
      vertex(points[int(startNum + 2) % points.length].x, points[int(startNum + 2) % points.length].y);
    }
    if (startNum + step > int(startNum + 3)) {
      vertex(points[int(startNum + 3) % points.length].x, points[int(startNum + 3) % points.length].y);
    }
    if (startNum + step > int(startNum + 4)) {
      vertex(points[int(startNum + 4) % points.length].x, points[int(startNum + 4) % points.length].y);
    }
    vertex(p2.x, p2.y);
    vertex(0, 0);
    endShape(CLOSE);
    startNum += step;
    i++;
  }
  pop();
}

function makeColorPallete(_colorNum) {
  _pallete = [];
  let selectPattern = int(random(5));
  switch (selectPattern) {
    case 0:
      _pallete = makeColorPalleteMonochromatic(_colorNum);
      break;
    case 1:
      _pallete = makeColorPalleteTriad(_colorNum);
      break;
    case 2:
      _pallete = makeColorPalleteComplementary(_colorNum);
      break;
    case 3:
      _pallete = makeColorPalleteComPound(_colorNum);
      break;
    case 4:
      _pallete = makeColorPalleteShade(_colorNum);
      break;
  }
  return _pallete;
}

function makeColorPalleteMonochromatic(_n) {
  let arr = [];
  let h_base = random(360);
  let s_base = random(80, 100);
  let b_base = random(90, 100);

  while (arr.length < _n) {
    let h = h_base;
    let s = s_base - random(0, 50);
    let b = b_base - random(0, 50);

    let isNear = false;
    for (let c of arr) {
      let ha = h / 360;
      let sa = s / 100;
      let ba = b / 100;
      let pa = createVector(ha, sa, ba);

      let hc = hue(c) / 360;
      let sc = saturation(c) / 100;
      let bc = brightness(c) / 100;
      let pc = createVector(hc, sc, bc);

      let distance = p5.Vector.dist(pa, pc);
      if (distance < 0.2) {
        isNear = true;
      }
    }
    if (isNear == false) {
      arr.push(color(h, s, b));
    }
  }
  return arr;
}

function makeColorPalleteTriad(_n) {
  let arr = [];
  let startAngle = random(360);
  for (let angle = startAngle; angle < startAngle + 360; angle += 360 / 3) {
    let h_base = angle % 360;
    let s_base = random(80, 100);
    let b_base = random(90, 100);
    arr.push(color(h_base, s_base, b_base));
  }
  let prev_num = arr.length - 1;
  let temp_arr = [];
  while (temp_arr.length < _n - arr.length) {
    let current_num = int(random(arr.length));
    while (prev_num == current_num) {
      current_num = int(random(arr.length));
    }
    let c = arr[current_num];
    let h = hue(c);
    let s = saturation(c) - random(5, 15);
    let b = brightness(c) - random(5, 15);
    let c_ = color(h, s, b);
    temp_arr.push(c_);
    prev_num = current_num;
  }
  for (let c of temp_arr) {
    arr.push(c);
  }
  return arr;
}

function makeColorPalleteComplementary(_n) {
  let arr = [];
  let angleA = random(360);
  let angleB = (angleA + 180) % 360;
  let h_a = angleA % 360;
  let h_b = angleB % 360;
  let s_base = random(80, 100);
  let b_base = random(90, 100);
  arr.push(color(h_a, s_base, b_base));
  arr.push(color(h_b, s_base, b_base));

  let pA = createVector(h_a / 360, s_base / 100, b_base / 100);
  let pB = createVector(h_b / 360, s_base / 100, b_base / 100);

  let temp_arr = [];

  while (temp_arr.length < _n - arr.length) {
    let dir = random(100) < 50;
    let ratio = random(5, 35) / 100;
    let pC;
    if (dir) {
      pC = p5.Vector.lerp(pA, pB, ratio);
    } else {
      pC = p5.Vector.lerp(pB, pA, ratio);
    }

    let isNear = false;
    for (let cc of temp_arr) {
      pD = createVector(hue(cc) / 360, saturation(cc) / 100, brightness(cc) / 100);
      let distance = p5.Vector.dist(pC, pD);
      if (distance < 0.2) {
        isNear = true;
      }
    }
    if (isNear == false) {
      let h = pC.x * 360;
      let s = pC.x * 100;
      let b = pC.x * 100;

      temp_arr.push(color(h, s, b));
    }
  }
  for (let c of temp_arr) {
    arr.push(c);
  }
  return arr;
}

function makeColorPalleteComPound(_n) {
  let arr = [];
  let angle_base = random(360);
  let angleA = (360 + angle_base + random(75, 90));
  let angleB = (360 + angle_base - random(75, 90));
  let h_a = angleA % 360;
  let h_b = angleB % 360;
  let s_base = random(80, 90);
  let b_base = random(90, 100);
  arr.push(color(h_a, s_base, b_base));
  arr.push(color(h_b, s_base, b_base));
  let pA = createVector(h_a / 360, s_base / 100, b_base / 100);
  let pB = createVector(h_b / 360, s_base / 100, b_base / 100);

  let temp_arr = [];
  while (temp_arr.length < _n - arr.length) {
    let ratio = (arr.length + temp_arr.length) % 2 == 0 ? 0.25 : 1 - 0.25;
    let angle = lerp(angleA, angleB, ratio);
    let h = angle % 360;
    let s = random(s_base * 2 / 3, s_base);
    let b = random(b_base * ceil((temp_arr.length) / 2) / 3, b_base);
    temp_arr.push(color(h, s, b));
  }
  for (let c of temp_arr) {
    arr.push(c);
  }
  return arr;
}

function makeColorPalleteShade(_n) {
  let arr = [];
  let angle_base = random(360);
  let h_base = angle_base % 360;
  let s_base = random(80, 90);
  let b_base = random(85, 95);
  arr.push(color(h_base, s_base, b_base));

  let temp_arr = [];
  let step = 5;
  while (temp_arr.length < _n - arr.length) {
    let ratio = 1 - (temp_arr.length + arr.length) / _n;
    let h = h_base;
    let s = s_base;
    let b = constrain(b_base * ratio + int(random(-2, 2)) * b_base / 10, 25, 100);
    temp_arr.push(color(h, s, b));
  }
  for (let c of temp_arr) {
    arr.push(c);
  }
  return arr;
}

function drawBackgroundNoise(_n) {
  for (let i = 0; i < _n; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let w = random(1, 2);
    let h = random(1, 2);
    noStroke();
    fill(0, 0, 0, random(10));
    ellipse(x, y, w, h);
  }
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

function drawNoise(_x, _y, _w,_h,_n,_c) {
  push();
  translate(_x, _y);
  for (let i = 0; i < _n; i++) {
    let x = random(0, _w);
    let y = random(0, _h);
    let w = random(1, 3);
    let h = random(1, 3);
    noStroke();
    fill(_c);
    ellipse(x, y, w, h);
  }
  pop();
}