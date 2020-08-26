function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
}

function draw() {
	background(0, 0, 95);
	for (let i = 0; i < 5; i++) {
		separateGrid(0, 0, width);
	}
	frameRate(1);
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && w > width / 3) {
				separateGrid(i, j, w);
			} else {
				drawFancySquare(i, j, w);
			}
		}
	}
}

function drawFancySquare(x, y, w) {
	let g = createGraphics(w, w);
	let rotate_num = random(360);
	g.angleMode(DEGREES);
	g.curveTightness(random(1, -5));
	for (let d = w; d > 0; d -= w / 50) {

		g.push();
		g.translate(w / 2, w / 2);
		g.rotate(rotate_num + d / 5);
		g.translate(d, 0);
		// let d = w / 2 * 0.5;
		g.beginShape();
		g.curveVertex(-d, -d);
		g.curveVertex(d, -d);
		g.curveVertex(d, d);
		g.curveVertex(-d, d);
		g.curveVertex(-d, -d);
		g.curveVertex(d, -d);
		g.curveVertex(d, d);
		g.endShape();
		g.pop();
	}
	let ratio = 1;
	image(g, x + w * (1 - ratio) / 2, y + w * (1 - ratio) / 2, w * ratio, w * ratio);
}