//reference : https://twitter.com/flyingpiiman/status/923926652580532225

let cells, offset;
let texture;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	texture = createGraphics(width, height);
	texture.colorMode(HSB, 360, 100, 100, 100);
	texture.angleMode(DEGREES);
	for (let i = 0; i < width * height * 40 / 100; i++) {
		let r = (1 - random(random())) * sqrt(width * width + height * height) / 2;
		let angle = random(360);
		let x = width / 2 + cos(angle) * r;
		let y = height / 2 + sin(angle) * r;
		texture.stroke(0,0,random(100) > 50 ? 10:90,10);
		texture.point(x, y);
	}
}

function draw() {
	background(0, 0, 95);

	cells = int(random(3, 10)) * 3;
	offset = width / 10;

	let w = (width + offset * 2) / cells;
	let h = (height + offset * 2) / cells;

	let n = 0;
	for (let j = 0; j < cells; j++) {
		for (let i = 0; i < cells; i++) {
			let ww = j % 2 == 0 ? 0 : w * 0.5;
			let x = -offset + i * w + ww;
			let y = -offset + j * h;
			if (n % 2 == 0) {
				drawingContext.shadowColor = color(0, 0, 10);
			} else {
				drawingContext.shadowColor = color(0, 0, 90);
			}
			drawingContext.shadowBlur = min(w, h) / 5;
			n % 2 == 0 ? fill(0, 0, 10) : fill(0, 0, 90);
			n % 2 == 0 ? stroke(0, 0, 90) : stroke(0, 0, 10);
			rect(x, y, w, h);
			n++;
		}
	}
	//noLoop();
	image(texture,0,0);
	frameRate(0.5);
}