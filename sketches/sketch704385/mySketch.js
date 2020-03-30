let url = "https://coolors.co/app/d8dbe2-a9bcd0-58a4b0-373f51-1b1b1e";
let pallete = [];

let cells, cols, rows;
let offset, margin;
let w, h;
let pfc = -1;
let psc = -1;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
}

function draw() {
	background(0, 0, 95);

	init();
	noLoop();
}

function init() {
	pallete = createPallete(url);
	let bn = int(random(pallete.length));
	bc = pallete[bn]
	pallete.splice(bn, 1);
	background(bc)

	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	drawNoiseBackground(100000, graphics);


	cells = 　int(random(2, 10));
	cols = cells;
	rows = cells;

	offset = (width / cells) / int(random(3, 5));
	margin = offset / int(random(2, 5));

	w = (width - offset * 2 - margin * (cols - 1)) / cols;
	h = (height - offset * 2 - margin * (rows - 1)) / rows;

	let ratio = 0.25;

	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			let cx = map(i, 0, cols - 1, offset, width - offset - w);
			let cy = map(j, 0, rows - 1, offset, height - offset - h);
			// rect(cx, cy, w, h);
			let nMax = int(random(1, 2));
			let n = 0;
			while (n < nMax) {
				drawDotInArc(cx + w / 2, cy + h / 2, w, h, ratio);
				n++;
			}
		}
	}
	image(graphics, 0, 0);

}


function drawDotInArc(_cx, _cy, _w, _h, _ratio) {
	push();
	translate(_cx, _cy);
	rotate(int(random(4)) * 90);
	push();
	translate(-_w / 2, -_h / 2);

	let fc = pfc;
	while (fc == pfc) {
		let cfn = int(random(pallete.length));
		fc = pallete[cfn];
	}
	let sc = psc;
	while (sc == psc || sc == fc) {
		let csn = int(random(pallete.length));
		sc = pallete[csn];
	}
	fill(fc);
	pfc = fc;
	noStroke();
	arc(0, 0, _w * 2, _h * 2, 0, 90, PIE);
	let nMax = sqrt(sq(_w) + sq(_h));
	let dStep = _w / (int(random(3, 6) * int(random(3, 6))));
	let diameter = dStep / random(2, 4);
	for (let n = 0; n <= nMax; n += nMax / 20) {
		let x1 = n;
		let y1 = 0;
		let x2 = 0;
		let y2 = n;
		//line(x1, y1, x2, y2);

		let angle = atan2(y1 - y2, x1 - x2);
		let distance = dist(x1, y1, x2, y2);
		for (let d = 0; d < distance; d += dStep) {
			let x = x1 + cos(180 + angle) * d;
			let y = y1 + sin(180 + angle) * d;
			let distance2 = dist(x, y, 0, 0);

			let distanceA = dist(x + diameter, y + diameter, 0, 0);
			let distanceB = dist(x - diameter, y - diameter, 0, 0);

			let angleA = atan2(y + diameter, x + diameter);
			let angleB = atan2(y - diameter, x - diameter);

			if (distanceA < _w && distanceB < _w && distance2 < _w && angleA > 0 && angleA < 90 && angleB > 0 && angleB < 90) {
				noStroke();
				fill(sc);
				// arc(x, y, diameter*2, diameter*2,0,90);
				ellipse(x, y, diameter, diameter);
			}
		}
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