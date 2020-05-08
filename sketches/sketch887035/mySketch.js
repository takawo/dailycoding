let colorCode;
let ns = 80;

let texture;

function setup() {

	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	colorCode = [color(0, 0, 20), color(25, 90, 70), color(0, 80, 100), color(25, 90, 90), color(60, 90, 90), color(120, 90, 90), color(220, 80, 100), color(310, 90, 90), color(0, 0, 50), color(0, 0, 90), color(43, 90, 90), color(0, 0, 70)];

	texture = createGraphics(width, height);
	texture.stroke(20, 3 / 100 * 255);
	for (let i = 0; i < width * height * 10 / 100; i++) {
		texture.strokeWeight(random(5));
		texture.point(random(width),
			random(height));
	}

}

function draw() {
	background(0, 0, 90);
	image(texture, 0, 0);
	let w = sqrt(sq(width) + sq(height));
	//randomSeed(500 + frameCount);
	push();
	translate(width / 2, height / 2);
	rotate(int(random(8)) * 360 / 8);
	separateGrid(-w / 2, -w / 2, w);
	pop();

	//save("img-" + frameCount + ".png");
	frameRate(0.5);
	// noLoop();
}

function drawResist(x, y, w) {
	push();
	translate(x + w / 2, y + w / 2);
	drawingContext.shadowColor = color(0, 0, 0, 15);
	drawingContext.shadowBlur = w;
	drawingContext.shadowOffsetY = w / 4;

	rotate(int(random(4)) * 360 / 4);
	translate(-w / 2, -w / 2);

	stroke(0, 0, 60);
	beginShape();
	noFill();
	vertex(w * 0.05, w);
	strokeWeight(w * 0.02);
	bezierVertex(w * 0.05, w * 3 / 4, w * 0.05, w / 2, w * 0.15, w / 2);
	endShape();

	beginShape();
	noFill();
	vertex(w * 0.95, w);
	strokeWeight(w * 0.02);
	bezierVertex(w * 0.95, w * 3 / 4, w * 0.95, w / 2, w * 0.85, w / 2);
	endShape();

	translate(w / 2, w / 2);
	// rotate(int(random(4)) * 360 / 4);


	rectMode(CENTER);
	let ww = w * 0.7;
	let hh = w * 0.3;
	noStroke();
	fill(30, 30, 80);
	rect(0, 0, ww, hh, w);
	for (let i = 0; i < 4; i++) {
		let offset = w * 0.18;
		let xx = map(i, 0, 3, -ww / 2 + offset, ww / 2 - offset);
		let yy = hh / 2;
		strokeWeight(w * 0.05);
		let cNum;
		if (i < 3) {
			cNum = int(random(colorCode.length - 2));
		} else {
			cNum = int(random(colorCode.length - 2, colorCode.length));
		}
		stroke(colorCode[cNum]);
		strokeCap(SQUARE);
		line(xx, -yy, xx, yy);
	}
	pop();
}



function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			let n = noise(i / ns, j / ns, frameCount / ns);
			if (n > 0.5 && d > width / 15) {
				separateGrid(i, j, w);
			} else {
				drawResist(i, j, w);
			}
		}
	}
}