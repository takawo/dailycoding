let cells, cols, rows;
let offset, margin;
let w, h;

let url = "https://coolors.co/app/29335c-007991-f4d06f-82d173-ef476f";
let pallete = [];
let palleteMaster;
let bgC;
let graphics;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	background(0, 0, 90);
	init();
}

function init() {
	cells = int(random(3, 15));
	cols = cells;
	rows = cells;

	offset = width / 10;
	margin = offset / 4;

	pallete = createPallete(url);
	bgNum = int(random(pallete.length));
	bgC = pallete[bgNum];
	pallete.splice(bgNum, 1);
	background(bgC);

	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	drawNoiseBackground(50000, graphics);

	let fillNum = int(random(pallete.length));
	let fc = pallete[fillNum];
	pallete.splice(fillNum, 1);
	fill(fc);
	noStroke();
	w = (width - offset * 2 - margin * (cols - 1)) / cols;
	h = (height - offset * 2 - margin * (rows - 1)) / rows;


	push();
	translate(width / 2, height / 2);
	rotate(int(random(4)) * 90);

	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			let x = map(i, 0, cols - 1, -width / 2 + offset, width / 2 - offset - w);
			let y = map(j, 0, rows - 1, -height / 2 + offset, height / 2 - offset - h);
			let r = (w + h) / 2;
			x += r / 2;
			y += r / 2;
			r *= 1.45;
			let n = (i + j * cols);
			if (cells % 2 == 0 && j % 2 == 0) {
				n += 1;
			}
			drawTriangle(x, y, r, n);
		}
	}
	pop();
}

function drawTriangle(_x, _y, _r, _n) {
	let direction = _n % 2 == 0 ? 1 : -1;
	let yOffset = direction * _r / 8;
	let points = [];
	push();
	translate(_x, _y + yOffset);
	rotate(30 + 180 * (_n % 2));
	beginShape();

	for (let i = 0; i < 3; i++) {
		let angle = 360 / 3 * i;
		let x = cos(angle) * _r / 2;
		let y = sin(angle) * _r / 2;
		vertex(x, y);
		let p = createVector(x, y);
		points.push(p);
	}
	endShape(CLOSE);

	for (let i = 0; i < 3; i++) {
		let p0 = points[i % 3];
		let p1 = points[(i + 1) % 3];
		let p2 = points[(i + 2) % 3];
		let offset = 1 / int(random(3, 10));
		let sep = int(random(5, 15));

		for (let i = offset; i < 1 - offset; i += (1 - offset) / sep) {
			let pA = p5.Vector.lerp(p1, p0, i);
			let pB = p5.Vector.lerp(p2, p0, i);
			let fc = int(random(pallete.length));
			fill(pallete[fc]);
			noStroke();
			beginShape();
			vertex(pA.x, pA.y);
			vertex(pB.x, pB.y);
			vertex(p0.x, p0.y);
			endShape(CLOSE);
		}
	}
	pop();

}


function draw() {

	init();
	image(graphics, 0, 0);
	frameRate(1);

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
	let c = color(0, 0, 100, 7);
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