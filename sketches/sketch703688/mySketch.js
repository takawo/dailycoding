let url = "https://coolors.co/573ced-7b9fe9-e349c5-feb870-9aece0";
let pallete = [];

let cells, cols, rows;
let offset, margin;
let w, h;
let graphics, bc;
let pfc = -1;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	randomSeed(random(10000));
}

function draw() {
	init();
	frameRate(1);
	//noLoop();
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

	cells = int(random(2, 8));
	cols = cells;
	rows = cells;

	offset = width / cells / int(random(2, 4));
	margin = offset / int(random(2, 4));

	w = (width - offset * 2 - margin * (cols - 1)) / cols;
	h = (height - offset * 2 - margin * (rows - 1)) / rows;

	let d = (w + h) / 1.5;

	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			let x = map(i, 0, cols - 1, offset, width - offset - w);
			let y = map(j, 0, rows - 1, offset, height - offset - h);
			x = x + w / 2;
			y = y + h / 2;
			drawCircleWithArc(x, y, d);
		}
	}
	image(graphics, 0, 0);

}

function drawCircleWithArc(_cx, _cy, _diameter) {
	let cx = _cx;
	let cy = _cy;
	let rate = 0.85;

	push();
	translate(cx, cy);
	rotate(int(random(8)) * 360 / 8);

	let angle = 0;
	let separateAngle = int(random(3, 8));
	let angleStep = 360 / separateAngle;
	while (angle < 360) {
		let diameterMax = _diameter * rate;
		diameterMax = diameterMax / random(1, 2.5);
		if (angle + angleStep > 360) {
			angleStep = 360 - angle;
		}
		let separateDiameter = int(random(1, 8));
		let diameterStep = diameterMax / separateDiameter;
		let diameter = diameterMax;
		while (diameter > 0) {
			let fc = pfc;
			while (fc == pfc) {
				let cfn = int(random(pallete.length));
				fc = pallete[cfn];
			}
			fill(fc);
			noStroke();
			arc(0, 0, diameter, diameter, angle, angle + angleStep, PIE);
			diameter -= diameterStep;
			pfc = fc;
		}
		angle += angleStep;
	}
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