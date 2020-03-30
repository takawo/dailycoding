function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);

  //セルの線幅指定
  voronoiCellStrokeWeight(0);
  //サイト（=セルごとの重心？）の線幅指定
  voronoiSiteStrokeWeight(1);
  //セルの線の色指定
  voronoiCellStroke(0);
  //サイトの線の色指定
  voronoiSiteStroke(0);
  //サイトの描画ON/OFF
  voronoiSiteFlag(true);
  
  mousePressed();
}

function mousePressed() {
  background(150);
  
//ランダムなサイトを30個，最短距離50の条件で生成する
  voronoiRndSites(int(random(5,30)), 10);

  //ジッター（Jitter）の設定．Jitter：セルの境界線のゆらぎ
  //（スケッチではジッターをOFFにしている）
  //ジッターの最大ステップ数の設定
  //voronoiJitterStepMax(10);
  //ジッターの最小ステップ数の設定
  //voronoiJitterStepMin(5);
  //ジッターのスケールファクター
  voronoiJitterFactor(3);
  //ジッターの線描画ON/OFF
  voronoiJitterBorder(true);


  //ボロノイ図の計算，幅高さ，ジッター生成のON/OFF
  voronoi(800, 800, true);

  //生成したボロノイ図の詳細をvoronoiGetDiagramでオブジェクトとして取得
  //自作で描画プログラムなどを作る場合は利用できそう
  //https://github.com/gorhill/Javascript-Voronoi
  let diagram = voronoiGetDiagram();
  //console.log(diagram);

  //ボロノイ図からセルだけを取得
  let normal = voronoiGetCells();
  //console.log(normal);

  //ボロノイ図からジッター付きのセルを取得
  var jitter = voronoiGetCellsJitter();
  //console.log(jitter);  

  //ボロノイ図の描画
  //x,y,塗りつぶしON/OFF,ジッターのON/OFF
  voronoiDraw(0, 0, true, false);

  //マウスの位置からボロノイ図のセルを取得する
  //x,y,ジッターの有無
  var cellId = voronoiGetSite(mouseX, mouseY, false);
  //console.log(cellId + ": " + voronoiNeighbors(cellId));

  //マウスで取得したボロノイ図のセルを描画する．
  //x,y,セルのID，描画モード，塗りつぶしON/OFF，ジッターのON/OFF

  // voronoiDrawCell(800, 10, cellId, VOR_CELLDRAW_BOUNDED, true, false);
  // voronoiDrawCell(1000, 10, cellId, VOR_CELLDRAW_BOUNDED, false, true);
  // voronoiDrawCell(800, 300, cellId, VOR_CELLDRAW_SITE, true, false);
  // voronoiDrawCell(1000, 300, cellId, VOR_CELLDRAW_SITE, false, true);
  // voronoiDrawCell(800, 610, cellId, VOR_CELLDRAW_CENTER, true, false);
  // voronoiDrawCell(1000, 610, cellId, VOR_CELLDRAW_CENTER, false, true);

}