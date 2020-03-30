let url = "https://coolors.co/app/011627-f71735-41ead4-fdfffc-ff9f1c";

let colors = [];
let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let bc;
let prevC;
let graphics;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	colors = createPallete(url);

	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	drawNoiseBackground(100000, graphics);
	frameRate(.5);
}

function draw() {
	let pallete = colors.concat();
	let bn = int(random(pallete.length));
	bc = pallete[bn]
	pallete.splice(bn, 1);
	blendMode(BLEND);
	background(bc);

	cells = int(random(2, 15));
	cols = cells;
	rows = cells;

	let w = sqrt(sq(width) + sq(height));

	offset = width / (int(random(2, 5)) * 5);
	margin = 0;
	offset / 5;

	cellW = (w - offset * 2 - margin * (cols - 1)) / cols;
	cellH = (w - offset * 2 - margin * (cols - 1)) / rows;

	push();
	translate(width / 2, height / 2);
	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			let x = map(i, 0, cols - 1, -w / 2 - offset, w / 2 + offset - cellW);
			let y = map(j, 0, rows - 1, -w / 2 - offset, w / 2 + offset - cellH);
			push();
			translate(x, y);
			let p1;
			let p2;
			let c1 = getRandomColor(pallete);
			let c2 = getRandomColor(pallete);
			if (random() < 0.5) {
				stroke(0, 0, 20);
				line(0, 0, cellW, cellH);
				p1 = createVector(0, 0);
				p2 = createVector(cellW, cellH);
			} else {
				stroke(0, 0, 20);
				line(cellW, 0, 0, cellH);
				p1 = createVector(0, cellH);
				p2 = createVector(cellW, 0);
			}
			drawLineWithCircle(p1, p2, c1, c2);
			pop();
		}
	}
	pop();
	blendMode(ADD);
	image(graphics, 0, 0);
}

function drawLineWithCircle(p1, p2, c1, c2) {
	let angle = atan2(p2.y - p1.y, p2.x - p1.x);
	let distance = p5.Vector.dist(p1, p2);
	let dMax = width / cells / int(random(2, 10));
	let nStep = 1;
	push();
	translate(p1.x, p1.y);
	push();
	rotate(angle);
	let m = random(1, 2);
	for (let n = 0; n < distance; n += nStep) {
		let x0 = n;
		let y0 = 0;
		//colorMode(RGB);
		let c = lerpColor(color(c1), color(c2), n / distance);
		let angle2 = map(n, 0, distance, 0, 360);
		let d = map(sin((p1.x + p1.y + angle2) * m), -1, 1, 0, dMax);
		let x = x0 + cos(90 + n) * d / 2;
		let y = y0 + sin(90 + n) * d / 2;
		fill(c);
		noStroke();
		ellipse(x, y, d, d);
	}
	pop();
	pop();
}

function getRandomColor(_pallete) {
	let _c = prevC;
	while (_c == prevC) {
		_c = _pallete[int(random(_pallete.length))];
	}
	prevC = _c;
	return _c;
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

function drawNoiseBackground(_n, _graphics) {
	let c = color(0, 0, 100, 6);
	_graphics.noStroke();
	_graphics.fill(c);
	for (let i = 0; i < _n; i++) {
		let x = random(1) * width;
		let y = random(1) * height;
		let w = random(1, 3);
		let h = random(1, 3);
		_graphics.ellipse(x, y, w, h);
	}
}