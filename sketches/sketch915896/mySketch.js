let palette = ["#10111C", "#23AECC", "#ECE1B4", "#CC3016", "#F2C96E", "#178FA6"];
let count = 0;
let texture;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	drawingContext.imageSmoothingEnabled = false;

	texture = createGraphics(width, height);
	texture.stroke(255, 10 / 100 * 255);
	for (let i = 0; i < width * height * 5 / 100; i++) {
		texture.strokeWeight(random(3));
		texture.point(random(width),
			random(height));
	}

}

function draw() {
	background(0, 0, 20);
	separateGrid(0, 0, width);
	image(texture, 0, 0);
	noLoop();
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 95 && d > width / 10) {
				separateGrid(i, j, w);
			} else {
				for (let k = 0; k < 4; k++) {
					push();
					translate(i + w / 2, j + w / 2);
					rotate(k * 360 / 4);
					translate(-w / 2 + w / 20, -w / 2 + w / 20);
					drawDotRect(0, 0, w - w / 20 * 2, w - w / 20 * 2, palette[count % palette.length]);
					count++;
					pop();
				}
			}
		}
	}
}

function drawDotRect(x, y, w, h, c) {
	let sep = int(random(2, 8));
	let g = createGraphics(w / sep, h / sep);
	let step = int(1, 10);
	g.stroke(c);
	for (let j = 0; j < g.height; j++) {
		for (let i = 0; i < g.width; i++) {
			let n = j * g.width + i;
			if (n % step == 0) g.point(i, j);
		}
	}
	// drawingContext.shadowBlur = min(w,h)/2;
	// drawingContext.shadowColor = color(c);
	image(g, x, y, w, h);
}