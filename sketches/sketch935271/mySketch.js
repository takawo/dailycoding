let rows;
let offset, margin, w, h;
let g;
let url = "https://coolors.co/fe938c-e6b89c-ead2ac-9cafb7-4281a4";
let palette
let bg;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	init();
}

function init() {
	palette = shuffle(createPalette(url), true);
	bg = palette.splice(0, 1);
	rows = int(random(3, 8));
	offset = width / 30;
	margin = offset / 2;
	h = (height - offset * 2 - margin * (rows - 1)) / rows;
	w = width - offset * 2;
	g = createGraphics(width, height);
	g.colorMode(HSB, 360, 100, 100, 100);
	g.angleMode(DEGREES);
}

function draw() {
	g.clear();
	background(bg[0]);
	for (let i = 0; i < rows; i++) {
		let x = offset;
		let y = offset + i * (h + margin);
		drawFancyShape(x + w / 2, y + h / 2, w, g);
	}
	drawingContext.shadowColor = color(0, 0, 0, 33);
	drawingContext.shadowBlur = h / 3;
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
	g.noStroke();
	let nStep = 0;
	for (let n = 0; n < d; n += nStep) {
		nStep = min(d / int(random(2, 50)), h);
		if (nStep + n > d) nStep = d - n;
		g.fill(c);
		g.arc(n + nStep / 2, 0, nStep, nStep, 0, 180);
		pc = c;
		while (c == pc) c = random(palette);
	}
	for (let n = 0; n < d; n += nStep) {
		nStep = min(d / int(random(2, 50)), h);
		if (nStep + n > d) nStep = d - n;
		g.fill(c);
		g.arc(n + nStep / 2, 0, nStep, nStep, 180, 360);
		pc = c;
		while (c == pc) c = random(palette);
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