//reference: Julien Espagnon's awesome penplotter works!
//https://twitter.com/Julien_Espagnon/status/1239654399741493248

let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  blendMode(BLEND);
  background(random(360), 10,95);
  // blendMode(ADD);

  separateGrid(0, 0, width);
  noLoop();
}

//再帰関数，基準のXY座標と正方形の大きさdを引数とする
function separateGrid(x, y, d) {
  //正方形の分割数をランダムに決定
  let sepNum = int(random(1, 4));
  //分割した際の1ブロックの大きさを計算しwとする
  let w = d / sepNum;
  for (let i = x; i < x + d; i += w) {
    for (let j = y; j < y + d; j += w) {
      //90%の確率且つ分割数がwidth/15より大きいとき再分割
      if (random(random()) * 100 < 90 && d > width / 5) {
        separateGrid(i, j, w);
      } else {
        push();
        translate(i+w/2,j+w/2);
        rotate(int(random(4)) * 360/4);
        translate(-w/2,-w/2);
        let x = 0;
        let y = 0;
        let x1, y1, x2, y2;
        if (random(100) > 50) {
          x1 = x;
          y1 = y;
          x2 = x + w;
          y2 = y + w;
        } else {
          x1 = x;
          y1 = y + w;
          x2 = x + w;
          y2 = y;
        }
        // stroke(0, 0, 100);
        // line(x1, y1, x2, y2);
        let d1 = random(random()) * w/3;
        let d2 = w/3-d1;
        drawEllipseLine(x1, y1, x2, y2, d1,d2);
        pop();
      }
    }
  }
}

function mousePressed() {
  redraw();
}


function drawEllipseLine(x1, y1, x2, y2, d1, d2, c1 = color(random(220,330),80,100), c2 = color(random(110,220),80,100)) {
  let distance = dist(x1, y1, x2, y2);
  let angle = atan2(y2 - y1, x2 - x1);
  let d = d1;

  push();

  drawingContext.shadowColor = lerpColor(c1,c2,0.5);
  drawingContext.shadowBlur = width/50;
  drawingContext.shadowOffsetX = distance/20;
  drawingContext.shadowOffsetY = distance/20;

  translate(x1, y1);
  rotate(angle);

  let gradient = drawingContext.createLinearGradient(-d1 / 2, 0, distance + d2 / 2, 0);

  gradient.addColorStop(0.0, c1);
  gradient.addColorStop(random(0.3, 0.7), lerpColor(c1, c2, 0.5));
  gradient.addColorStop(1.0, c2);
  //上で指定したグラデーション内容を塗りつぶしスタイルに代入する
  drawingContext.strokeStyle = gradient;
  noFill();
  // stroke(0,0,100);


  for (let n = 1; n > 0; n -= 1) {
    beginShape();
    let dd1 = d1 * n;
    let dd2 = d2 * n
    for (let angle = 90; angle < 270; angle++) {
      vertex(cos(angle) * dd1 / 2, sin(angle) * dd1 / 2);
    }
    for (let angle = 270; angle < 360 + 90; angle++) {
      vertex(distance + cos(angle) * dd2 / 2, sin(angle) * dd2 / 2);
    }

    endShape(CLOSE);
  }

  for (let n = 1/5; n <= 1; n += 1 / 5) {
    colorMode(RGB);
    let c = lerpColor(c1, c2, n);
    colorMode(HSB);
    let x = n * distance;
    let d = d1 + (d2 - d1) * n;
    // noStroke();
    ellipse(x, 0, d/4);
  }
  // line(0,0,distance,0);
  pop();
}