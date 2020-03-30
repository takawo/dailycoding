let pallete = ["#538696", "#562324", "#88A5AE", "#C2221D", "#05556E", "#DADADA", "#0D0F11"];
let graphics;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
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
	background(0, 0, 20);
	push();
	translate(width / 2, height / 2);
	rotate(45);
	let w = sqrt(sq(width) + sq(height));
	let cells = int(random(3, 8));
	let cols = cells;
	let rows = cells;
	let offset = width / 10;
	let margin = offset / 5;
	let cellW = (w + offset * 2 - margin * (cols - 1)) / cols;
	let cellH = (w + offset * 2 - margin * (rows - 1)) / rows;

	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			let x = -w / 2 + i * (cellW + margin);
			let y = -w / 2 + j * (cellH + margin);
			push();
			translate(x + cellW / 2, y + cellH / 2);
			rotate(int(random(4)) * 360 / 4);
			//ランダムなサイトを30個，最短距離50の条件で生成する
			let points = int(random(5, 20));
			voronoiRndSites(points, 20);
			//ボロノイ図の計算，幅高さ，ジッター生成のON/OFF
			voronoi(cellW, cellH, true);
			let diagram = voronoiGetDiagram();

			//ボロノイ図からセルだけを取得
			let normal = voronoiGetCells();
			for (let arr of normal) {
				noStroke();
				let c1 = random(pallete);
				let c2 = random(pallete);
				while (c1 == c2) {
					c2 = random(pallete);
				}

				let num = int(random(11)) / 10;
				let c = lerpColor(color(c1), color(c2), num);
				fill(c1);
				beginShape();
				for (let p of arr) {
					vertex(p[0] - cellW / 2, p[1] - cellH / 2);
				}
				endShape();

			}
			pop();

		}
	}
	pop();
	image(graphics, 0, 0);

}

function createPallete(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');
	for (let i = 0; i < arr.length; i++) {
		arr[i] = '#' + arr[i];
	}
	return arr;
}