let graphics;

let img;

function preload() {
  let n = int(random(1000));
  img = loadImage("https://loremflickr.com/800/800?lock="+n);
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

  background(150);


  let cells = int(random(5,15));
  let offset = width / 10;
  let margin = offset / 5;
  let cellSize = (width - offset * 2 - margin * (cells - 1)) / cells;
  let arr = [];
  
  arr.push([0-200,0-200]);
  arr.push([width+200,0-200]);
  arr.push([width+200,height+200]);
  arr.push([0-200,height+200]);
  arr.push([width/2,height/2]);
  
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset + i * (cellSize + margin);
      let y = offset + j * (cellSize + margin);
      arr.push([x,y]);
      arr.push([x+cellSize,y]);
      arr.push([x+cellSize,y+cellSize]);
      arr.push([x,y+cellSize]);
      arr.push([x+cellSize/2,y+cellSize/2]);            
    }
  }
  //print(arr);
  voronoiSites(arr);
  push();
  //translate(width/2,height/2);
  //ボロノイ図の計算，幅高さ，ジッター生成のON/OFF
  voronoi(width, height, false);


  //生成したボロノイ図の詳細をvoronoiGetDiagramでオブジェクトとして取得
  //自作で描画プログラムなどを作る場合は利用できそう
  //https://github.com/gorhill/Javascript-Voronoi
  let diagram = voronoiGetDiagram();
  //print(diagram);

  let normal = voronoiGetCells();

  let g = createGraphics(width, height);
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
  pop();
  image(graphics, 0, 0);



}