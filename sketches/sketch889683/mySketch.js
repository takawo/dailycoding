let texture;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	texture = createGraphics(width, height);
	texture.colorMode(HSB, 360, 100, 100, 100);
	texture.angleMode(DEGREES);
	texture.fill(0, 0, 0, 5);
	texture.noStroke();
	for (let i = 0; i < width * height * 10 / 100; i++) {
		let w = random(3);
		let h = random(3);
		texture.push();
		texture.translate(random(width), random(height));
		texture.rotate(random(360));
		texture.ellipse(0, 0, w, h);
		texture.pop();
	}

}

function draw() {
	background(0, 0, 20);

	push();
	translate(width / 2, height / 2);

	for (let i = 0; i < 9; i++) {
		push();
		let angle = map(i, 0, 9, 0, 360);
		let d = width * 1 / 2;
		push();
		rotate(angle);
		noStroke();
		drawingContext.shadowColor = color(0, 0, 0, 5);
		drawingContext.shadowBlur = d / 10;
		let tailStep = int(random(4, 30));
		for (let n = 0; n < d; n++) {
			let x = n;
			let y = sin(n * 2 * (i % 2 == 0 ? -1 : 1)) * d / tailStep;
			push();
			translate(x, y);
			let angle3 = map(n, 0, d, 0, 90);
			let dd = map(sin(angle3 * 2), 0, 1, 0, d / 4);
			if (i % 2 == 0) {
				circle(0, -dd / 2, dd);
			} else {
				square(0, -dd / 2, dd);

			}
			pop();
		}
		pop();
		pop();
	}

	pop();
	image(texture, 0, 0);
	noLoop();
}