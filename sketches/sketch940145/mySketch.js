//reference: @kusakarism's awesome sketch!
//https://twitter.com/kusakarism/status/1288781583588065280
let url = "https://coolors.co/588b8b-ffffff-ffd5c2-f28f3b-c8553d";
let palette;

let offset;
let cols, margin, colSize;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	palette = createPalette(url);
	init();
}

function init() {
	cols = int(random(3, 10));
	offset = width / 10;
	margin = offset / 2;
	colSize = (width - offset * 2 - margin * (cols - 1)) / cols;
}

function draw() {
	background(220, 80, 20);
	randomSeed(frameCount / 120);
	for (let i = 0; i < cols; i++) {
		let x1 = offset + i * (colSize + margin) + colSize / 2;
		let y1 = offset;
		let x2 = x1;
		let y2 = height - offset;
		let d = colSize;
		drawContinuousArc(x2, y2, x1, y1, d);
	}
	// noLoop();
	if (frameCount % 120 == 0) {
		init();
	}
}

function drawContinuousArc(x1, y1, x2, y2, d) {
	// line(x1,y1,x2,y2);
	let distance = dist(x1, y1, x2, y2);
	let angle = atan2(y2 - y1, x2 - x1);

	let c = random(palette);
	let pc = c;

	push();
	translate(x1, y1);
	rotate(angle);
	let n = 0;
	let nStep;
	let a = frameCount * 3;
	let aStep;
	while (n < distance) {
		while (pc == c) {
			c = random(palette);
		}
		fill(c);
		pc = c;
		nStep = distance / (10 + cols * 5);
		if (n + nStep > distance) nStep = distance - n;
		aStep = 90;
		noStroke();
		drawingContext.shadowColor = color(0, 0, 0, 50);
		drawingContext.shadowOffsetY = nStep / 4;
		drawingContext.shadowBlur = nStep / 4;
		arc(n, 0, d / 2, d, a, a + aStep, PIE);
		a += aStep;
		n += nStep;
	}
	pop();
}

function createPalette(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');
	for (let i = 0; i < arr.length; i++) {
		arr[i] = color('#' + arr[i]);
	}
	return arr;
}