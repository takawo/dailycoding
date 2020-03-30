function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	background(0, 0, 10);
}

function draw() {
	blendMode(BLEND);
	background(0, 0, 10, 30);
	blendMode(ADD);
	randomSeed(1000);
	for (let r = 1000; r > 0; r -= 10) {

		push();
		translate(width / 2, height / 2);
		let m = random(1, 3)*5;
		scale(tan((frameCount + r)%9 * m);
		rotate(random(360) + frameCount / m);
		let n = int(random(3, 10));
		for (let i = 0; i < n; i++) {
			let angle = map(i, 0, n, 0, 360);
			let x = cos(angle) * r;
			let y = sin(angle) * r;
			let d = map(n, 3, 10, 10, 2);
			noStroke();
			fill(r % 360, 80, 100);
			ellipse(x, y, d, d);
		}
		pop();
	}
}