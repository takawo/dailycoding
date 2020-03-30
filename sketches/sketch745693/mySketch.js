let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let pallete = ["#09061B", "#13215C", "#BC5159", "#533355", "#956782", "#F9A16F", "#F8BE86"];
let graphics;
let bg;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	init();
}

function init() {
	let p = pallete.concat();
	let bgNum = int(random(p.length));
	let bg = p[bgNum];
	p.splice(bgNum, 1);
	background(bg);

	let grNum = int(random(p.length));
	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	drawNoiseBackground(50000, graphics, p[grNum]);
	p.splice(grNum, 1);

	cells = int(random(4, 12));
	cols = cells;
	rows = cells;

	offset = width / 10;
	margin = offset / 5;

	cellW = (width - offset * 2 - margin * (cols - 1)) / cols;
	cellH = (height - offset * 2 - margin * (rows - 1)) / rows;

	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			let x = map(i, 0, cols - 1, offset, width - offset - cellW);
			let y = map(j, 0, rows - 1, offset, height - offset - cellH);
			rectMode(CENTER);
			staircaseRect(x + cellW / 2, y + cellH / 2, cellW, cellH, p.concat());
		}
	}
	image(graphics, 0, 0);
}

function staircaseRect(_cx, _cy, _w, _h, _p) {
	push();
	translate(_cx, _cy);
	rotate(int(random(4)) * 360 / 4);
	let sep = 1 + int(random(2, cells)) * 2;
	let w = _w / sep;
	let m = int(random(2));
	let prevC = -1;
	for (let i = 0; i < sep; i++) {
		let h = _h * ((i + 1) / sep);
		let x = w * i - _w / 2 + w / 2;
		let y = -h / 2 + _h / 2;
		let c = random(_p);
		while (prevC == c) {
			c = random(_p);
		}
		rectMode(CENTER);
		noStroke();
		fill(c);
		if (i % 2 == m) {
			rect(x, y, w, h, w);

			prevC = c;
		} else {}
	}
	pop();
}

function drawNoiseBackground(_n, _graphics, _c) {
	let c = color(_c + "15");
	for (let i = 0; i < _n; i++) {
		let x = random(1) * width;
		let y = random(1) * height;
		let w = random(1, 2);
		let h = random(1, 2);
		_graphics.noStroke();
		_graphics.fill(c);
		_graphics.ellipse(x, y, w, h);
	}
}