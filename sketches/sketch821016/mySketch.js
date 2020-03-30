let pallete = ["#EDF7F5", "#B7D7D8", "#FF8984", "#204E5F", "#FFC6A8"];

let cells, cols, rows;
let offset, margin;
let w, h;
let graphics;
let min_margin;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
}

function draw() {
	init();
	image(graphics, 0, 0);
	frameRate(1);
}

function init() {

	graphics = createGraphics(width, height);
	graphics.stroke(0, 5);
	let percent = 10 / 100;
	for (let i = 0; i < graphics.width * graphics.height * percent; i++) {
		let x = random(width);
		let y = random(height);
		graphics.strokeWeight(random(3));
		graphics.point(x, y);
	}
	
	min_margin = int(random(1,10))/10;

	cells = int(random(8, 15));
	cols = cells;
	rows = cells;

	offset = width / 20;
	margin = random(100) > 50 ? offset / 5 : 0;

	w = (width - offset * 2 - margin * (cols - 1)) / cols;
	h = (height - offset * 2 - margin * (rows - 1)) / rows;

	background(0, 0, 90);

	let jStep = 1;
	for (let j = 0; j < rows; j += jStep) {
		let iStep = 1;
		jStep = int(random(1, 4));
		if (j + jStep > rows) {
			jStep = rows - j;
		}
		let ch = h * jStep + margin * (jStep - 1);
		for (let i = 0; i < cols; i += iStep) {
			let x = map(i, 0, cols - 1, +offset, width - offset - w);
			let y = map(j, 0, rows - 1, +offset, height - offset - h);
			iStep = int(random(1, 3));
			if (i + iStep > cols) {
				iStep = cols - i;
			}
			let cw = w * iStep + margin * (iStep - 1);
			rect(x, y, cw, ch);
			let points = [];
			points.push(createVector(x, y));
			points.push(createVector(x + cw, y));
			points.push(createVector(x + cw, y + ch));
			points.push(createVector(x, y + ch));
			drawSeparatedRect(points, 3);
		}
	}
}

function drawSeparatedRect(_points, _depth) {
	if (_depth < 0) {
		return;
	}
	let n = int(random(_points.length / 2));
	let m = int(n + _points.length / 2);
	let n_f = random(min_margin, 1 - min_margin);
	let m_f = random(min_margin, 1 - min_margin);
	let n_next = (n + 1) % _points.length;
	let m_next = (m + 1) % _points.length;
	let p3 = p5.Vector.lerp(_points[n], _points[n_next], n_f);
	let p4 = p5.Vector.lerp(_points[m], _points[m_next], m_f);
	stroke(0, 0, 100);
	strokeWeight(1);
	strokeJoin(ROUND);
	fill(random(pallete));
	//fill(0,0,100);
	quad(p3.x, p3.y, p4.x, p4.y, _points[m_next].x, _points[m_next].y, _points[n].x, _points[n].y);
	fill(random(pallete));
	quad(p4.x, p4.y, p3.x, p3.y, _points[n_next].x, _points[n_next].y, _points[m].x, _points[m].y);

	let pointsA = [p3, p4, _points[m_next], _points[n]];
	drawSeparatedRect(pointsA, _depth - 1);
	let pointsB = [p4, p3, _points[n_next], _points[m]];
	drawSeparatedRect(pointsB, _depth - 1);
}