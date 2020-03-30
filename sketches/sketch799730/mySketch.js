let offset, margin;
let cells, w, d;
let graphics;
const speed = 2;
let rs0;
let rs1;
let rs2;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	rs1 = int(random(10000));
	rs2 = int(random(10000));

	offset = width / 10;
	cells = int(random(2, 10));

	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	graphics.noStroke();

	for (let i = 0; i < width * height * 15 / 100; i++) {
		if (random(100) > 50) {
			graphics.fill(0, 0, 0, 10);
		} else {
			graphics.fill(0, 0, 100, 10);
		}
		let x = random(width);
		let y = random(height);
		let w = random(3);
		let h = random(3);
		graphics.ellipse(x, y, w, h);
	}
}

function draw() {
	background(0, 0, 95);
	let marginMax = (width - 0 * cells - offset * 2) / (cells - 1);
	margin = marginMax / 2 + sin(frameCount * speed) * marginMax / 2;
	d = (width - offset * 2 - margin * (cells - 1)) / cells;

	for (let j = 0; j < cells; j++) {
		for (let i = 0; i < cells; i++) {
			let x = +offset + i * (d + margin);
			let y = +offset + j * (d + margin);
			randomSeed(rs1 + i + j * cells);
			push();
			translate(x + d / 2, y + d / 2);
			rotate(int(random(4)) * 360 / 4);
			fill(0, 0, 80);
			noStroke();
			if (random(100) > 50) {
				arc(-d / 2, -d / 2, d * 2, d * 2, 0, 90, PIE);
			} else {
				triangle(-d / 2, -d / 2, d / 2, -d / 2, -d / 2, d / 2);
			}
			pop();
			if (i < cells - 1 && j < cells - 1) {
				randomSeed(rs2 + i + j * cells);
				push();
				translate(x + d + margin / 2, y + d + margin / 2);
				rotate(int(random(4)) * 360 / 4);
				fill(0, 0, 20);
				noStroke();
				if (random(100) > 50) {
					arc(-margin / 2, -margin / 2, margin * 2, margin * 2, 0, 90, PIE);
				} else {
					triangle(-margin / 2, -margin / 2, margin / 2, -margin / 2, -margin / 2, margin / 2);
				}
				pop();
			}
		}
	}
	image(graphics, 0, 0);
	if ((270 + frameCount * speed) % 180 == 0) {
		randomSeed(frameCount*10);
		cells = int(random(3, 15));
	}
}