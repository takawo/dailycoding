//reference: Julien Espagnon's awesome penplotter works!
//https://twitter.com/Julien_Espagnon/status/1239654399741493248

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
}

function draw() {
	background(0, 0, 95);

	let offset = width / 10;

	for (let i = 0; i < 15; i++) {

		let d1 = 25;
		let x1 = random(offset + d1 / 2, width - offset - d1 / 2);
		let y1 = random(offset + d1 / 2, height - offset - d1 / 2);
		let d2 = 100;
		let x2 = random(offset + d2 / 2, width - offset - d2 / 2);
		let y2 = random(offset + d2 / 2, height - offset - d2 / 2);

		let hue = random(360);
		c1 = color(hue, 100, 100);
		c2 = color((hue + 180) % 360, 80, 100);

		drawEllipseLine(x1, y1, d1, c1, x2, y2, d2, c2);
	}
	frameRate(0.5);
}


function drawEllipseLine(x1, y1, d1, c1, x2, y2, d2, c2) {
	let distance = dist(x1, y1, x2, y2);
	let angle = atan2(y2 - y1, x2 - x1);
	let d = d1;

	push();
	translate(x1, y1);
	rotate(angle);
	for (let n = 0; n < 1; n += 1 / 100) {
		colorMode(RGB);
		let c = lerpColor(c1, c2, n);
		colorMode(HSB);
		let x = n * distance;
		let d = d1 + (d2 - d1) * n;
		fill(c);
		noStroke();
		ellipse(x, 0, d);
	}
	// line(0,0,distance,0);
	pop();
}