// inspired from @chaosgroove's tweet.
// https://twitter.com/chaosgroove/status/1289156678751940608

let graphics;
let n = 0;
function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	graphics.angleMode(DEGREES);
}

function draw() {
	background(0, 0, 90);
	graphics.clear();
	let offset = width / 15;

	separateGrid(offset, offset, width - offset * 2, graphics);

	drawingContext.shadowColor = color(0, 0, 0, 33);
	drawingContext.shadowBlur = offset / 5;

	image(graphics, 0, 0);
	frameRate(1);
}

function drawxgun(x, y, w, h, g) {
	let num = 20;
	let ratio = (num - 1) / num - 3 / 100;
	let ratio_b = 0.4;
	let ratio_c = 0.2;
	let sw = w / num;
	g.push();
	g.translate(x + w / 2, y + w / 2);

	let ww = w * ratio;
	let hh = w * ratio;
	switch (n%2) {
		case 0:
			g.rectMode(CENTER);
			g.noStroke();
			g.fill(0);
			g.rect(-ww / 2, -hh / 2, sw, sw);
			g.rect(+ww / 2, -hh / 2, sw, sw);
			g.rect(-ww / 2, +hh / 2, sw, sw);
			g.rect(+ww / 2, +hh / 2, sw, sw);

			g.strokeWeight(sw);
			g.strokeCap(SQUARE);
			g.stroke(0);

			g.line(-ww / 2, -hh / 2, ww / 2, hh / 2);
			g.line(ww / 2, -hh / 2, -ww / 2, hh / 2);

			g.line(-ww / 2, -hh / 2, -ww / 2 + ww / 2 * ratio_b, -hh / 2);
			g.line(-ww / 2, -hh / 2, -ww / 2, -hh / 2 + hh / 2 * ratio_b);
			g.line(-ww / 2, hh / 2, -ww / 2 + ww / 2 * ratio_b, hh / 2);
			g.line(-ww / 2, hh / 2, -ww / 2, hh / 2 - hh / 2 * ratio_b);

			g.line(ww / 2, -hh / 2, ww / 2 - ww / 2 * ratio_b, -hh / 2);
			g.line(ww / 2, -hh / 2, ww / 2, -hh / 2 + hh / 2 * ratio_b);
			g.line(ww / 2, hh / 2, ww / 2 - ww / 2 * ratio_b, hh / 2);
			g.line(ww / 2, hh / 2, ww / 2, hh / 2 - hh / 2 * ratio_b);
			break;
		case 1:
			let sqw = sqrt(ww * ww + hh * hh) / 2;
			for (let angle = 0; angle < 360; angle += 90) {
				let _x1 = cos(angle + 45) * sqw;
				let _y1 = sin(angle + 45) * sqw;
				let _x2 = cos(angle + 45) * sqw * ratio_c;
				let _y2 = sin(angle + 45) * sqw * ratio_c;

				g.rectMode(CENTER);
				g.noStroke();
				g.fill(0);
				g.rect(_x2, _y2, sw, sw);

				g.strokeWeight(sw);
				g.strokeCap(SQUARE);
				g.stroke(0);

				g.line(_x1, _y1, _x2, _y2);
				g.push();
				g.translate(_x2, _y2);
				g.rotate(angle);
				g.line(0, 0, 0, sin(45) * ww / 2 * ratio_b);
				g.line(0, 0, cos(45) * ww / 2 * ratio_b, 0);
				g.pop();
			}
	}
	g.pop();
	n++;
}



function separateGrid(x, y, d, g) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 15) {
				separateGrid(i, j, w, g);
			} else {
				drawxgun(i, j, w, w, graphics);
			}
		}
	}
}