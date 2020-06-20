let url = "https://coolors.co/e63946-f1faee-a8dadc-457b9d-1d3557";
let texture;
let pallete;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	pallete = createPallete(url);

	texture = createGraphics(width, height);
	texture.colorMode(HSB, 360, 100, 100, 100);
	texture.angleMode(DEGREES);

	texture.stroke(0, 0, 100, 3);
	for (let i = 0; i < width * height * 1 / 100; i++) {
		let x = random(width);
		let y = random(height);
		let angle = 90 + random(15) * (random(100) > 50 ? -1 : 1);
		let d = width / 20;
		texture.line(x + cos(angle) * d, y + sin(angle) * d,
			x + cos(angle + 180) * d, y + sin(angle + 180) * d);
	}
}

function draw() {
	background(0, 0, 20);
	let w = sqrt(width * width + height * height);
	push();
	translate(width / 2, height / 2);
	rotate(int(random(8)) * 360 / 8);
	drawTriangles(0, 0, w);
	pop();
	image(texture, 0, 0);
	noLoop();
}

function drawTriangles(x, y, r) {
	noStroke();
	let colors = shuffle(pallete.concat());
	drawingContext.shadowColor = color(colors[4]);
	drawingContext.shadowBlur = r / 5;
	rectMode(CENTER);
	// square(x, y, r);
	push();
	translate(x, y);
	rotate(int(random(4)) * 360 / 4);
	let s = r / 2;
	let transparent_ratio = 33 / 100 * 255;
	strokeWeight(0.5);
	fill(colors[0] + hex(transparent_ratio, 2));
	stroke(colors[1] + hex(transparent_ratio, 2));
	triangle(-s, -s, s, s, -s, s);
	fill(colors[2] + hex(transparent_ratio, 2));
	stroke(colors[3] + hex(transparent_ratio, 2));
	triangle(-s, -s, s, s, s, -s);
	pop();
	// circle(x,y,r);
	if (r > 25) {
		r *= 0.5;
		drawTriangles(x + r / 2, y, r);
		drawTriangles(x - r / 2, y, r);
		drawTriangles(x, y + r / 2, r);
		drawTriangles(x, y - r / 2, r);
	}
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