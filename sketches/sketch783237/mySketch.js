let emojiArr;
let pallete = ["#E9EBF9", "#CB0A0C", "#170A19", "#0D534A", "#108376", "#ADAFC6", "#F39A07", "#BC3C16"];
let graphics;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  emojiArr = createEmojiArr();

  //セルの線幅指定
  voronoiCellStrokeWeight(0);
  //サイト（=セルごとの重心？）の線幅指定
  voronoiSiteStrokeWeight(0);
  //セルの線の色指定
  voronoiCellStroke(0);
  //サイトの線の色指定
  voronoiSiteStroke(0);
  //サイトの描画ON/OFF
  voronoiSiteFlag(true);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);

  let percent = 15 / 100;
  let radius = sqrt(sq(width / 2) + sq(height / 2));
  for (let i = 0; i < width * height * percent; i++) {
    let angle = random(360);
    let r = 1 - (random(random(1)));
    let x = width / 2 + r * radius * cos(angle);
    let y = height / 2 + r * radius * sin(angle);
    let w = random(3);
    let h = random(3);
    graphics.fill(0, 0, 100, 8);
    graphics.noStroke();
    graphics.ellipse(x, y, w, h);
  }
  mousePressed();
}

function mousePressed() {
  background(0,0,20);

  //ランダムなサイトを100個，最短距離50の条件で生成する
  voronoiRndSites(150, 10);

  //ボロノイ図の計算，幅高さ，ジッター生成のON/OFF
  voronoi(800, 800, false);

  //生成したボロノイ図の詳細をvoronoiGetDiagramでオブジェクトとして取得
  //自作で描画プログラムなどを作る場合は利用できそう
  //https://github.com/gorhill/Javascript-Voronoi
  let diagram = voronoiGetDiagram();
  //console.log(diagram);

  //ボロノイ図からセルだけを取得
  let normal = voronoiGetCells();
  for (let arr of normal) {

    let cp = createVector();
    for (let p of arr) {
      cp.add(createVector(p[0], p[1]));
    }
    cp.div(arr.length);
    let distance = 0;
    for (let p of arr) {
      distance = max(distance, p5.Vector.dist(cp, createVector(p[0], p[1])));
    }

    let g1 = createGraphics(distance * 2, distance * 2);
    g1.textSize(distance * 2.5);
    g1.textAlign(CENTER, CENTER);
    g1.fill(255);
    g1.push();
    g1.translate(g1.width / 2, g1.height / 2 + g1.height / 10);
    g1.rotate(random(TWO_PI));
    g1.text(random(emojiArr), 0,0);
    g1.pop();
    
    let g2 = createGraphics(distance * 2, distance * 2);
    g2.noStroke();
    g2.beginShape();
    for (let p of arr) {
      let d = p5.Vector.dist(cp, createVector(p[0], p[1]));
      let a = atan2(p[1] - cp.y, p[0] - cp.x);
      g2.vertex(g2.width / 2 + cos(a) * d, g2.height / 2 + sin(a) * d);
    }
    g2.endShape();

    let img = pgMask(g1, g2);
    push();
    translate(cp.x, cp.y);
    imageMode(CENTER);
    image(img, 0, 0);
    pop();

  }
  image(graphics, 0, 0);
}


function pgMask(_content, _mask) {
  var img = createImage(int(_mask.width), int(_mask.height));
  img.copy(_mask, 0, 0, _mask.width, _mask.height, 0, 0, _mask.width, _mask.height);
  img.loadPixels();
  for (var i = 0; i < img.pixels.length; i += 4) {
    var v = img.pixels[i];
    img.pixels[i] = 0;
    img.pixels[i + 1] = 0;
    img.pixels[i + 2] = 0;
    img.pixels[i + 3] = v;
  }
  img.updatePixels();
  var contentImg = createImage(int(_content.width), int(_content.height));
  contentImg.copy(_content, 0, 0, _content.width, _content.height, 0, 0, _content.width, _content.height);
  contentImg.mask(img)
  return contentImg;
}


function createEmojiArr() {
  let arr = [];
  let emoji;
  for (let i = 128512; i < 128592; i++) {
    emoji = String.fromCodePoint(i);
    arr.push(emoji);
  }
  for (let i = 127744; i < 128318; i++) {
    emoji = String.fromCodePoint(i);
    arr.push(emoji);
  }
  return arr;
}