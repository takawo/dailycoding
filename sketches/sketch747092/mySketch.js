let cells, cols, rows;
let margin, offset;
let cellW, cellH;
let pallete = ["#55A9C7", "#2B140F", "#F99815", "#0786F8", "#FED9B2", "#DC2012"];
let graphics;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	drawNoiseBackground(100000, graphics);

	background(20);
	let cells = int(random(3, 8));
	rows = cells;
	offset = width / 20;
	margin = offset / 2;

	cellW = width - offset * 2;
	cellH = (height - offset * 2 - margin * (rows - 1)) / rows;

	for (let i = 0; i < rows; i++) {
		let p = pallete.concat();
		let x = offset;
		let y = map(i, 0, rows - 1, offset, height - offset - cellH);
		let rectNum = int(random(p.length));
		fill(p[rectNum]);
		p.splice(rectNum, 1);
		noStroke();
		rect(x, y, cellW, cellH);
		for (let k = 0; k < p.length; k++) {
			let freq = int(random(1, 8)) / 8;
			let startAngle = int(random(8)) * 360 / 8;
			push();
			translate(x + cellW / 2, y + cellH / 2);
			rotate(int(random(2)) * 360 / 2);
			stroke(p[k] + "11");
			strokeCap(SQUARE);
			for (let x2 = -cellW / 2; x2 < cellW / 2; x2 += .1) {
				let y2 = constrain(sin(startAngle + (y + x2) * freq) * cellH, -cellH / 2, cellH / 2);
				line(x2, 0, x2, y2);
			}
			pop();
		}
	}
	image(graphics, 0, 0);
}

function drawNoiseBackground(_n, _graphics) {
	let c = color(0, 0, 100, 6);
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