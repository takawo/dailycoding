let ns = 80;
let graphics;

function setup() {
  createCanvas(1840, 900);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  //粒状感のレイヤー
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);

  //画面の15%に粒子を5%の透明度で描画
  graphics.fill(0, 0, 100, 5);
  graphics.noStroke();
  for (let i = 0; i < graphics.width * graphics.height * 15 / 100; i++) {
    graphics.ellipse(
      random(graphics.width),
      random(graphics.height),
      random(3),
      random(3)
    );
  }
}

function draw() {
  //画面を覆うため対角線の長さを計算
  let w = sqrt(sq(width) + sq(height));

  push();
  translate(width / 2, height / 2);
  //予め画面を回転させておく
  rotate(int(random(8)) * 360 / 8);
  //分割
  separateGrid(-w / 2, -w / 2, w);
  pop();
  //粒状感を乗せる
  image(graphics, 0, 0);
  noLoop();
}

//sキーで保存，それ以外は再描画
function keyPressed() {

  if (key == "s" || key == "S") {
    let fileName = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second();
    save("img" + fileName + ".png");
  }
  redraw();
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      let n = noise(i / ns, j / ns, frameCount / ns);
      if (n > 0.5 && d > width / 5) {
        separateGrid(i, j, w);
      } else {
        drawWave(i, j, w);

      }
    }
  }
}

// @reona396
function drawWave(x, y, w) {
  const themeColor = random(360);

  const wavesNumArray = [5, 10, 30, 50];
  const wavesNum = random(wavesNumArray);

  push();
  translate(x + w / 2, y + w / 2);
  rotate(int(random(4)) * 360 / 4);
  translate(-w / 2, -w / 2);
  let g = createGraphics(w, w);
  g.colorMode(HSB, 360, 100, 100, 100);
  g.fill(themeColor, random(30, 100), random(80, 100));
  g.noStroke();
  g.rect(0, 0, w, w);

  for (let i = 0; i < wavesNum; i++) {
    const hue = i % 2 ? themeColor : (themeColor + 180) % 360;
    const saturation = random(30, 100);
    const brightness = random(80, 100);
    const ox = random(-w / 2, w / 2);
    const oy = 0;
    let x, y;
    const yStepA = floor(random(1, 6));
    const yStepB = floor(random(1, 6));
    let xoff = 0.0;
    let xoffStep = random(0.005, 0.02)

    g.noStroke();
    g.fill(hue, saturation, brightness);

    g.push();
    g.translate(ox, oy);
    g.beginShape();
    // 行き
    let offset = w / 10;
    for (y = -offset; y <= w + offset; y += yStepA) {
      x = map(noise(xoff), 0, 1, 0, w);
      g.curveVertex(x, y);
      xoff += xoffStep;
    }
    xoff = 0.0;
    // 帰り
    for (y = w + offset; y >= -offset; y -= yStepB) {
      x = map(noise(xoff), 0, 1, 0, w);
      g.curveVertex(x, y);
      xoff += xoffStep;
    }
    g.endShape();
    g.pop();
		imageMode(CENTER);
    image(g, g.width/2, g.height/2,g.width * 0.9,g.height*0.9);
  }
  pop();
}