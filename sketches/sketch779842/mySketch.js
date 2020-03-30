let graphics;
let pallete = ["#DADCDA", "#DE200C", "#3A6DA8", "#A8BACC", "#0A1D4E", "#CD4645", "#C0AEB5", "#838CA9"];
let typoGraphics;
let font;
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let bg;

function preload() {
  font = loadFont("Lato-Black.ttf");
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

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

  let percent = 25 / 100;
  let radius = sqrt(sq(width / 2) + sq(height / 2));
  for (let i = 0; i < width * height * percent; i++) {
    let angle = random(360);
    let r = 1 - (random(random(1)));
    let x = width / 2 + r * radius * cos(angle);
    let y = height / 2 + r * radius * sin(angle);
    let w = random(3);
    let h = random(3);
    graphics.fill(0, 0, random() < 0.5 ? 100 : 0, 8);
    graphics.noStroke();
    graphics.ellipse(x, y, w, h);
  }
}

function draw() {
  mousePressed();
  frameRate(1);
}

function mousePressed() {
  let colors = pallete.concat();
  let tcNum = int(random(colors.length));
  let tc = colors[tcNum];
  colors.splice(tcNum, 1);
  let bgNum = int(random(colors.length));
  let bg = colors[bgNum];
  colors.splice(bgNum, 1);

  background(bg);
  typoGraphics = createGraphics(width, height);
  typoGraphics.colorMode(HSB, 360, 100, 100, 100);
  typoGraphics.textFont(font);
  typoGraphics.textSize(width * 0.9);
  typoGraphics.textAlign(CENTER, CENTER);
  typoGraphics.fill(tc);
  typoGraphics.text(str.substr(int(random(str.length)), 1), width / 2, height / 2 - height / 10);
  image(typoGraphics, 0, 0);

  //ランダムなサイトを100個，最短距離50の条件で生成する
  voronoiRndSites(random(50, 300), 0);

  //ボロノイ図の計算，幅高さ，ジッター生成のON/OFF
  voronoi(width, height, false);

  //生成したボロノイ図の詳細をvoronoiGetDiagramでオブジェクトとして取得
  //自作で描画プログラムなどを作る場合は利用できそう
  //https://github.com/gorhill/Javascript-Voronoi
  let diagram = voronoiGetDiagram();
  //print(diagram);

  let normal = voronoiGetCells();

  for (let i = 0; i < diagram.cells.length; i++) {
    let cx = 0;
    let cy = 0;
    for (let p of normal[i]) {
      cx += p[0];
      cy += p[1];
    }
    cx /= normal[i].length;
    cy /= normal[i].length;

    let site = diagram.cells[i].site;
    colorMode(RGB, 255, 255, 255);
    let c = color(typoGraphics.get(cx, cy));
    if (alpha(c) > 30) {
      let step = int(random(10, 20));
      let c2 = random(colors);

      for (let n = 1; n >= 0; n -= 1 / step) {
        let cc = lerpColor(color(c2), color(c), n);
        fill(cc);
        // stroke(c);
        // strokeWeight(0.2);
        noStroke();
        beginShape();

        for (let p of normal[i]) {
          let x = lerp(cx, p[0], n);
          let y = lerp(cy, p[1], n);
          vertex(x, y);
        }
        endShape(CLOSE);
      }
    }
  }

  image(graphics, 0, 0);
}