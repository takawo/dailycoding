let url = "https://coolors.co/app/26413c-19647e-00b9ae-93eaa9-f1e3f3";
let pallete;
let graphics;

let cells, cols, rows;
let offset, margin;
let w, h, cellW, cellH;
let prevC = -1;
let cellMax, cellMin;
let noiseScale = 100;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	init();
}

function init() {
	pallete = createPallete(url);
	let bn = int(random(pallete.length));
	bc = pallete[bn]
	pallete.splice(bn, 1);
	background(bc);

	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	drawNoiseBackground(100000, graphics);

	cells = int(random(5, 50));
	cols = cells;
	rows = cells;
	cellMax = cells / 5;
	cellMin = cellMax / 2;
	w = sqrt(sq(width) + sq(height));
	h = w;

	offset = 0;
	margin = w / 100;

	cellW = (w - offset * 2 - margin * (cols - 1)) / cols;
	cellH = (h - offset * 2 - margin * (rows - 1)) / rows;

	push();
	translate(width / 2, height / 2);
	rotate(45 + int(random(4)) * 90);

	let jStep = 1;
	for (let j = 0; j < rows; j += jStep) {
		let iStep = 1;
		jStep = int(random(cellMin, cellMax));
		if (j + jStep > rows) {
			jStep = rows - j;
		}
		let ch = cellH * jStep + margin * (jStep - 1);
		for (let i = 0; i < cols; i += iStep) {
			let x = map(i, 0, cols - 1, -w / 2 + offset, w / 2 - offset - cellW);
			let y = map(j, 0, rows - 1, -h / 2 + offset, h / 2 - offset - cellH);
			iStep = int(random(cellMin, cellMax));
			if (i + iStep > cols) {
				iStep = cols - i;
			}
			let cw = cellW * iStep + margin * (iStep - 1);
			fill(getRandomColor(pallete));
			noStroke();
			rect(x, y, cw, ch);
			drawDiagonalPattern(x, y, cw, ch);

		}
	}
	pop();

	image(graphics, 0, 0);
}

function drawDiagonalPattern(_x, _y, _w, _h) {
	let n = noise((_x + _w / 2) / noiseScale, (_y + _h / 2) / noiseScale);
	let rMax = map(n, 0, 1, 1, 5);
	let rMin = rMax / 3;
	push();
	translate(_x + _w / 2, _y + _h / 2);
	let step = createStep(rMin, rMax);
	push();
	translate(0, -_h / 2);
	for (let i = 0; i <= step; i++) {
		let ratio = 1 - i / step;
		let h = lerp(0, _h / 2, ratio);
		let w = lerp(0, _w / 2, ratio);
		fill(getRandomColor(pallete));
		noStroke();
		triangle(
			w, 0, -w, 0,
			0, h
		);
	}
	pop();
	step = createStep(rMin, rMax);
	push();
	translate(0, _h / 2);
	for (let i = 0; i <= step; i++) {
		let ratio = 1 - i / step;
		let h = lerp(0, -_h / 2, ratio);
		let w = lerp(0, _w / 2, ratio);
		fill(getRandomColor(pallete));
		noStroke();
		triangle(
			w, 0, -w, 0,
			0, h
		);
	}
	pop();
	step = createStep(rMin, rMax);
	push();
	translate(-_w / 2, 0);
	for (let i = 0; i <= step; i++) {
		let ratio = 1 - i / step;
		let h = lerp(0, -_h / 2, ratio);
		let w = lerp(0, _w / 2, ratio);
		fill(getRandomColor(pallete));
		noStroke();
		triangle(
			0, h,
			0, -h,
			w, 0
		);
	}
	pop();
	step = createStep(rMin, rMax);
	push();
	translate(_w / 2, 0);
	for (let i = 0; i <= step; i++) {
		let ratio = 1 - i / step;
		let h = lerp(0, -_h / 2, ratio);
		let w = lerp(0, -_w / 2, ratio);
		fill(getRandomColor(pallete));
		noStroke();
		triangle(
			0, h,
			0, -h,
			w, 0
		);
	}
	pop();

	pop();
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

function createStep(min, max) {
	return random(min, max) * random(min, max) + 1;
}

function drawNoiseBackground(_n, _graphics) {
	let c = color(0, 0, 100, 5);
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

function getRandomColor(_pallete) {
	let _c = prevC;
	while (_c == prevC) {
		_c = pallete[int(random(pallete.length))];
	}
	prevC = _c;
	return _c;
}