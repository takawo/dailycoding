let graphics;

let typoGraphics;
let font;
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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



	mousePressed();
}

function mousePressed() {
	// image(typoGraphics, 0, 0);
	background(0, 0, 90);


	typoGraphics = createGraphics(width, height);
	typoGraphics.colorMode(HSB, 360, 100, 100, 100);
	typoGraphics.textFont(font);
	typoGraphics.textSize(width * 0.9);
	typoGraphics.textAlign(CENTER, CENTER);
	typoGraphics.text(str.substr(int(random(str.length)), 1), width / 2, height / 2 - height / 10);

	//ランダムなサイトを100個，最短距離50の条件で生成する
	voronoiRndSites(random(100, 300), 0);

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
		let c = typoGraphics.get(cx, cy);
		let isNeighbour = false;
		let cc;
		for (let p of normal[i]) {
			cc = typoGraphics.get(p[0], p[1]);
			if(alpha(cc) > 30){
			isNeighbour = true;
			}
		}
		if (alpha(c) > 30 || isNeighbour) {
			stroke(0, 0, 100, 50);
			fill(c);
			//noFill();
			let step = int(random(3, 10));
			for (let n = 1; n >= 0; n -= 1 / step) {
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