let url = "https://coolors.co/app/ffcd38-f2816a-71dcdd-2d557f-f7ede2";
let pallete;
let graphics;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	pallete = createPallete(url);
	graphics = createGraphics(width, height);
	graphics.stroke(255, 8 / 100 * 255);
	for (let i = 0; i < width * height * 10 / 100; i++) {
		graphics.strokeWeight(random(3));
		graphics.point(random(width),
			random(height));
	}
}

function draw() {
	blendMode(BLEND);
	background(random(360), 5, 95);
	blendMode(BURN);

	for (let k = 0; k < 5; k++) {
		let offset, margin, cells, d;

		offset = width / 15;
		margin = 0
		cells = int(random(2, 12));
		d = (width - offset * 2 - margin * (cells - 1)) / cells;

		for (let j = 0; j < cells; j++) {
			for (let i = 0; i < cells; i++) {
				let x = offset + i * (d + margin);
				let y = offset + j * (d + margin);

				push();
				translate(x + d / 2, y + d / 2);
				rotate(int(random(4)) * 360 / 4);
				noStroke();

				let gradient = drawingContext.createRadialGradient(-d / 2, -d / 2, 0, -d / 2, -d / 2, d * 2);

				let c1 = random(pallete);
				let c2 = random(pallete);
				let c3 = random(pallete);
				while (c1 == c2 || c2 == c3 || c3 == c1) {
					c1 = random(pallete);
					c2 = random(pallete);
					c3 = random(pallete);
				}
				gradient.addColorStop(0, c1);
				gradient.addColorStop(0.5, c2);
				gradient.addColorStop(1, c3);

				drawingContext.shadowColor = random(pallete);
				drawingContext.shadowBlur = width / 40;

				drawingContext.fillStyle = gradient;
				if (random(100) > 33) {
					if (random(100) > 50) {
						if (random(100) > 50) {
							quad(-d / 2, -d / 2, 0, -d / 2, d / 2, d / 2, 0, d / 2);
						} else {
							quad(d / 2, -d / 2, 0, -d / 2, -d / 2, d / 2, 0, d / 2);
						}
					} else {
						triangle(-d / 2, -d / 2, d / 2, -d / 2, d / 2, d / 2);
					}
				}
				pop();
			}
		}
	}
	blendMode(BLEND);
	image(graphics, 0, 0);
	frameRate(0.5);
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