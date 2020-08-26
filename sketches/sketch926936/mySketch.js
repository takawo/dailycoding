let palette = ["#568777", "#B6BDB0", "#4C594B", "#FB9E27", "#2B9192", "#DC3509", "#0C120E", "#EEEEEE"];

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
}

function draw() {
	background(0, 0, 90);

	let offset = width / 10;
	let x = -offset;
	let y = -offset;
	let d = width + offset * 2;
	separateGrid(x, y, d);
	// noLoop();
	frameRate(0.5);
}


function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 5) {
				separateGrid(i, j, w);
			} else {
				drawingContext.shadowColor = color(0, 0, 0, 50);
				drawingContext.shadowBlur = w / 3;
				noStroke();
				switch (int(random(4))) {
					case 0:
						drawEllipseLine(i + w, j, w / 4, i, j + w, w / 2);
						break;
					case 1:
						drawEllipseLine(i, j, w / 4, i + w, j + w, w / 2);
						break;
					case 2:
						drawEllipseLine(i + w, j, w / 2, i, j + w, w / 4);
						break;
					case 3:
						drawEllipseLine(i, j, w / 2, i + w, j + w, w / 4);
						break;
				}
			}
		}
	}
}


function drawEllipseLine(x1, y1, d1, x2, y2, d2) {
	let c1 = palette[int(noise(x1, y1) * palette.length)];
	let c2 = palette[int(noise(x2, y2) * palette.length)];
	let gradient = drawingContext.createLinearGradient(x1, y1, x2, y2);
	gradient.addColorStop(0, c1);
	// gradient.addColorStop(.5, 'cyan');
	gradient.addColorStop(1, c2);

	// Set the fill style and draw a rectangle
	drawingContext.fillStyle = gradient;


	let distance = dist(x1, y1, x2, y2);
	let angle = atan2(y2 - y1, x2 - x1);
	push();
	translate(x1, y1);
	rotate(angle);
	beginShape();
	let x, y;
	for (let a = 90; a < 90 + 180; a += 90) {
		let x1 = cos(a) * d1 / 2;
		let y1 = sin(a) * d1 / 2;
		let x4 = cos(a + 90) * d1 / 2;
		let y4 = sin(a + 90) * d1 / 2;
		let x2 = x1 + cos(a + 90) * d1 / 4;
		let y2 = y1 + sin(a + 90) * d1 / 4;
		let x3 = x4 + cos(a) * d1 / 4;
		let y3 = y4 + sin(a) * d1 / 4;
		vertex(x1, y1);
		bezierVertex(x2, y2, x3, y3, x4, y4);
	}
	for (let a = 90 + 180; a < 90 + 180 + 180; a += 90) {
		let x1 = distance + cos(a) * d2 / 2;
		let y1 = sin(a) * d2 / 2;
		let x4 = distance + cos(a + 90) * d2 / 2;
		let y4 = sin(a + 90) * d2 / 2;
		let x2 = x1 + cos(a + 90) * d2 / 3;
		let y2 = y1 + sin(a + 90) * d2 / 3;
		let x3 = x4 + cos(a) * d2 / 5;
		let y3 = y4 + sin(a) * d2 / 5;
		vertex(x1, y1);
		bezierVertex(x2, y2, x3, y3, x4, y4);
	}
	endShape(CLOSE);
	pop();
}