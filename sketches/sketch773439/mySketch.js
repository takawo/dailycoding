let graphics;

let img;

function preload() {
  img = loadImage("https://loremflickr.com/800/800/portrait");
}

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  //colorMode(HSB, 360, 100, 100, 100);

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
  background(150);

  //ランダムなサイトを100個，最短距離50の条件で生成する
  voronoiRndSites(1000, 0);

  //ボロノイ図の計算，幅高さ，ジッター生成のON/OFF
  voronoi(width, height, false);


  //生成したボロノイ図の詳細をvoronoiGetDiagramでオブジェクトとして取得
  //自作で描画プログラムなどを作る場合は利用できそう
  //https://github.com/gorhill/Javascript-Voronoi
  let diagram = voronoiGetDiagram();
  //print(diagram);

  let normal = voronoiGetCells();

  for (let i = 0; i < diagram.cells.length; i++) {
    let site = diagram.cells[i].site;
    let c = img.get(site.x, site.y);
    fill(c);
    noStroke();
    beginShape();
    for (let p of normal[i]) {
      vertex(p[0], p[1]);
    }
    endShape();
  }

  image(graphics, 0, 0);
}