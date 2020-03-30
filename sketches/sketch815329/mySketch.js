function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
}

function draw() {
	blendMode(BLEND);
	background(0, 0, 0, 50);
	blendMode(ADD);
	for (let r = 1000; r > 0; r -= 100) {
		randomSeed(r);

		push();
		translate(width / 2 + sin(frameCount + sin(frameCount / 3) * 90) * width / 4, height / 2 + cos(frameCount) * height / 4);
		rotate(r + frameCount / 100);
		let m = random(1, 3) * 5;
		scale(tan((frameCount / 9 + r / 10) % 100 * m));
		rotate(random(360) + frameCount / m);
		let n = int(random(3, 10));
		for (let i = 0; i < n; i++) {
			let angle = map(i, 0, n, 0, frameCount % 360);
			let x = cos(angle) * r * tan((r + angle) / 10 % 90);
			let y = sin(angle) * r * tan((r + angle) / 10 % 90);
			let d = map(n, 3, 10, 30, 0);
			noStroke();
			fill((frameCount / 10 + ((r + angle) % 180 + 90)) % 360, 80, 100);
			ellipse(x, y, d, d);
		}
		pop();
	}


	randomSeed(frameCount * 5);
	let cells = int(random(3, 9));
	let offset = -width / 10;
	let margin = 0;

	let d = (width - offset * 2 - margin * (cells - 1)) / cells;
	let ns = 100;

	for (let j = 0; j < cells; j++) {
		for (let i = 0; i < cells; i++) {
			randomSeed((i + j * cells) * 1000);

			let x = offset + i * (d + margin);
			let y = offset + j * (d + margin);
			push();
			translate(x + d / 2, y + d / 2);
			rotate(int(noise(x / ns, y / ns, frameCount / ns) * 4) * 360 / 4);
			noStroke();
			fill((frameCount / 10 + (x + y + frameCount)) % 360, 80, 100);
			triangle(-d / 2, -d / 2, d / 2, -d / 2, d / 2, d / 2);
			pop();
		}
	}

}