// way of drawing ellipse by dot is referred to @okazz_ awesome article.
// https://note.mu/outburst/n/n631a3845186c

let cells;
let cols, rows;
let offset, margin;
let bg;
let cellArr = [];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  smooth();
  init();
}

function init() {
  cells = int(random(3, 12)) * 5;
  cols = cells;
  rows = cells;
  offset = (width / cols) / int(random(2, 4));
  margin = offset / int(random(2, 4));
  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;

  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  bg.background(int(random(12))*360/12, 80, 20);
  drawNoiseBackground(50000, bg);
  cellArr = createCells(cols, rows);
  cellArr = makeCellMasonry(cellArr);
}

function makeCellMasonry(_arr) {
  for (let j = 0; j < _arr.length; j++) {
    for (let i = 0; i < _arr[j].length; i++) {
      let n = int(random(1, cells / 2));
      while (n > 0) {
        let isBlank = true;
        for (let l = j; l < j + n; l++) {
          for (let k = i; k < i + n; k++) {
            if (l > rows - 1 || k > cols - 1) {
              isBlank = false;
              break;
            }
            let cell_num = _arr[l][k];
            if (cell_num != -1) {
              isBlank = false;
              break;
            }
          }
        }
        if (isBlank) {
          for (let l = j; l < j + n; l++) {
            for (let k = i; k < i + n; k++) {
              _arr[l][k] = n;
            }
          }
          break;
        } else {
          n--;
        }
      }
    }
  }
  return _arr;
}

function mousePressed(){
	saveCanvas("output-col" + cols + "row-" + rows + ".png"); 
	init();
	redraw();
}


function createCells(_n, _m) {
  let _arr = [];
  for (let j = 0; j < _m; j++) {
    _arr[j] = [];
    for (let i = 0; i < _n; i++) {
      _arr[j][i] = -1;
    }
  }
  return _arr;
}

function drawNoiseBackground(_n, _graphics) {
  for (let i = 0; i < _n; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(0, 0, 100, 10);
    _graphics.ellipse(x, y, w, h);
  }
}

function draw() {
  image(bg, 0, 0);
  
  let direction = -1;
  
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, offset, width - offset - w);
      let y = map(j, 0, rows - 1, offset, height - offset - h);
      let c = color(0, 0, 100);
      let cell_num = cellArr[j][i];

      for (let l = j; l < j + cell_num; l++) {
        for (let k = i; k < i + cell_num; k++) {
          if (l > rows - 1 || k > cols - 1) {
            break;
          }
          if (cellArr[l][k] == cell_num) {
            cellArr[l][k] = -1;
          }
        }
      }
      let cell_w = w * cell_num + margin * (cell_num - 1);
      let cell_h = h * cell_num + margin * (cell_num - 1);

      if (cell_num != -1) {
        stroke(c);
        noFill();
        strokeWeight(0.5);
        //rect(x, y, cell_w, cell_h);
        if (random(100) < 50) {
          drawGradiendCircle(x, y, cell_w, c, direction);
        } else {
          drawGradiendArc(x, y, cell_w, 0, 90, c, direction);
        }
        direction *= -1;
      }
    }
  }
  noLoop();
}
// drawGradiendArc(width * 2 / 4, height * 2 / 4, 100, 0, 90, c);
// drawGradiendCircle(width * 2 / 4, height * 2 / 4, 80, c)  

function drawGradiendCircle(_x, _y, _diameter, _color,_direction) {
  angleMode(DEGREES);
  push();
  translate(_x + _diameter / 2, _y + _diameter / 2);
  let radius = _diameter / 2;
  let count = _diameter * _diameter / sqrt(2); //点の数
  stroke(_color);
  for (let i = 0; i < count; i++) {
    let angle = random(360);
    //let r = sqrt(random(1));
    let r = 1 + random(random(random(random(1)))) * _direction;
    let x = r * radius * cos(angle);
    let y = r * radius * sin(angle);
    x = constrain(x, -radius, radius);
    y = constrain(y, -radius, radius);
    point(x, y);
  }
  pop();
}

function drawGradiendArc(_centerX, _centerY, _diameter, startAngle, endAngle, _color,_direction) {
  angleMode(DEGREES);
  push();
  translate(_centerX + _diameter / 2, _centerY + _diameter / 2);
  rotate(int(random(4)) * 90);
  translate(-_diameter / 2, -_diameter / 2);
  let radius = _diameter;
  let diff = abs(endAngle - startAngle) / 360;
  let count = _diameter * _diameter / sqrt(2) * diff; //点の数
  stroke(_color);
  noFill();
  for (let i = 0; i < count; i++) {
    let angle = random(startAngle, endAngle);
    // let r = sqrt(random(1));
    let r = 1 + random(random(random(random(1))))* _direction;
    let x = r * radius * cos(angle);
    let y = r * radius * sin(angle);
    x = constrain(x, -radius, radius);
    y = constrain(y, -radius, radius);
    point(x, y);
  }
  pop();
}