let rows;
let offset, margin, w, h;
let g;
let url = "https://coolors.co/ffa69e-faf3dd-b8f2e6-aed9e0-5e6472"
let palette;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
}

function init() {
	palette = shuffle(createPalette(url), true);
	rows = int(random(5, 8));
	offset = width / 10;
	margin = 0;
	h = (height + offset * 2 - margin * (rows - 1)) / rows;
	w = width + offset * 2;
	g = createGraphics(width, height);
	g.colorMode(HSB, 360, 100, 100, 100);
	g.angleMode(DEGREES);
}

function draw() {
	init();
	blendMode(BLEND);
	background(0, 0, 20);
	g.clear();
	blendMode(ADD);
	for (let i = 0; i < rows; i++) {
		let x = -offset;
		let y = -offset + i * (h + margin);
		drawFancyShape(x + w / 2, y + h / 2, w, g);
	}
	image(g, 0, 0);
	// noLoop();
	frameRate(0.5);
}


function drawFancyShape(x, y, d, g) {
	let c, pc;
	c = random(palette);
	pc = c;
	while (c == pc) c = random(palette);
	g.push();
	g.translate(x, y);
	g.push();
	g.translate(-d / 2, 0);
	g.noFill();
	let nStep = 0;
	for (let n = 0; n < d; n += nStep) {
		nStep = min(d / int(random(2, 20)), h);
		if (nStep + n > d) nStep = d - n;
		g.push();
		g.translate(n + nStep / 2, 0);
		let sep = int(random(2, 8));
		for (let m = nStep; m > 0; m -= nStep / sep) {
			c = random(palette);
			while (c == pc) c = random(palette);
			pc = c;
			g.stroke(c);
			let sw = nStep / (sep * 4);
			g.drawingContext.shadowColor = color(c);
			g.drawingContext.shadowBlur = sw * 3;
			g.strokeWeight(sw);
			g.strokeCap(SQUARE);
			g.arc(0, 0, m - sw, m - sw, 0, 180);
		}
		g.pop();
	}
	for (let n = 0; n < d; n += nStep) {
		nStep = min(d / int(random(2, 20)), h);
		if (nStep + n > d) nStep = d - n;
		g.push();
		g.translate(n + nStep / 2, 0);
		sep = int(random(1, 5));
		for (let m = nStep; m > 0; m -= nStep / sep) {
			c = random(palette);
			while (c == pc) c = random(palette);
			pc = c;
			g.stroke(c);
			let sw = nStep / (sep * 4);
			g.drawingContext.shadowColor = color(c);
			g.drawingContext.shadowBlur = sw * 3;
			g.strokeWeight(sw);
			g.strokeCap(SQUARE);
			g.arc(0, 0, m - sw, m - sw, 180, 360);
		}
		g.pop();
	}
	g.pop();
	g.pop();
}

function createPalette(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');

	for (let i = 0; i < arr.length; i++) {
		let red = unhex(arr[i].substr(0, 2));
		let green = unhex(arr[i].substr(2, 2));
		let blue = unhex(arr[i].substr(4, 2));
		colorMode(RGB, 255, 255, 255);
		let c = color(red, green, blue);
		let h = hue(c);
		let s = saturation(c);
		let b = brightness(c);
		let t = 100;
		colorMode(HSB, 360, 100, 100, 100);
		c = color(h, s, b, t);
		arr[i] = c;
	}
	return arr;
}