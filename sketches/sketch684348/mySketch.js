let pallete = ["#96C1C3", "#C59CD0", "#FCB6D2", "#C3DAF9", "#FEF0C1"];
let count = 14; //1列にいくつの四角形を表示するか
let offset = 40;
let sw = 2;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB,360,100,100,100);
  pixelDensity(pixelDensity());
  noLoop();
}

function draw() {
  background(0,0,0);
  backgroundNoise(50000);
  tile();
}

function tile() {
  let w = (width - offset * 2) / count;

  for (let j = 0; j < count; j++) {
    for (let i = 0; i < count; i++) {
      //3.5で追加されたrectの正方形バージョン
      //square(i*w, j*w, w);
      let x = offset + i * w;
      let y = offset + j * w;
      randomShape(x, y, w - sw / 2);
    }
  }
}

function randomShape(x, y, s) {
  let hs = s / 2; //一辺の半分
  push();
  //座標軸を四角形の中心に移動
  translate(x + hs, y + hs);

  //4パターンの中からランダムに図形を選択
  if (random(1) > 3.0 / 4.0) {
    //四角形
    setFillAndStrokeColor();
    rectMode(CENTER);
    rect(0, 0, s, s);

    noFill();
    strokeCap(SQUARE);
    for (let ss = s; ss > 0; ss -= s / 4) {
      rect(0, 0, ss, ss);
    }

  } else if (random(1) > 2.0 / 4.0) {
    //三角形
    //0度、90度、180度、270度のどれかに回転をさせる
    setFillAndStrokeColor();

    rotate(HALF_PI * int(random(4)));
    triangle(-hs, -hs, hs, hs, -hs, hs);

    noFill();
    for (let ss = s; ss > 0; ss -= s / 4) {
      triangle(-hs, -hs + ss, hs - ss, hs, -hs, hs);
    }

  } else if (random(1) > 1.0 / 4.0) {
    //半円
    setFillAndStrokeColor();

    rotate(HALF_PI * int(random(4)));
    arc(0, -hs, s, s, 0, PI, PIE);

    noFill();
    for (let ss = s; ss > 0; ss -= s / 4) {
      arc(0, -hs, ss, ss, 0, PI, PIE);
    }


  } else {
    //1/4円
    setFillAndStrokeColor();
    rotate(HALF_PI * int(random(4)));
    arc(-hs, -hs, s * 2, s * 2, 0, HALF_PI, PIE);

    noFill();
    for (let ss = s; ss > 0; ss -= s / 4) {
      arc(-hs, -hs, ss * 2, ss * 2, 0, HALF_PI, PIE);
    }

  }
  pop();
}

//クリックで再描画
function mousePressed() {
  redraw();
}

//sキーで画像保存
function keyPressed() {
  if (key == 's') saveCanvas("####.png");
}

function setFillAndStrokeColor() {
  let n = floor(random(pallete.length));
  let m = 2; //floor(random(pallete.length));
  while (n == m) {
    n = floor(random(pallete.length));
  }

  fill(pallete[n]);
  strokeCap(SQUARE);
  stroke(pallete[m]);
  strokeWeight(sw);
}


function backgroundNoise(n) {
  for (let i = 0; i < n; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let w = random(1, 3);
    let h = random(1, 3);
    fill(0, 0, 70, 15);
    noStroke();
    ellipse(x, y, w, h);
  }

}