let url = "https://coolors.co/ffa69e-faf3dd-b8f2e6-aed9e0-5e6472";
// let palette = ["#EDF7F5", "#B7D7D8", "#FF8984", "#204E5F", "#FFC6A8"];
let palette;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	palette = createPalette(url);
}

function draw() {
	background(220, 80, 20);
	let cells = int(random(3, 10));
	let offset = width / 10;
	let d = (width - offset * 2) / cells;

	let angle = 45;

	for (let k = cells; k >= 0; k--) {
		for (let n = 0; n < 2; n++) {
			for (let j = 0; j < k; j++) {
				for (let i = 0; i < k; i++) {
					let offset2 = offset + d / 2 * (cells - k);
					let cx = offset2 + i * d + d / 2;
					let cy = offset2 + j * d + d / 2;
					//randomSeed(cx * cy + frameCount);
					angle += n * 180;
					noStroke();
					drawingContext.shadowColor = color(0, 0, 0, 15);
					drawingContext.shadowBlur = d / 4;

					let gradient = drawingContext.createRadialGradient(
						0, 0, 0, 0, 0, d / 2);
					palette = shuffle(palette, true);
					let c1 = random(palette);
					let c2 = random(palette);
					while (c1 == c2) {
						c2 = random(palette);
					}

					if (n == 0) {
						gradient.addColorStop(0, c1);
						gradient.addColorStop(1, c2);
					} else {
						gradient.addColorStop(0, c2);
						gradient.addColorStop(1, c1);

					}
					drawingContext.fillStyle = gradient;
					drawFancyShape(cx, cy, d, angle);
				}
			}
		}
	}
	// noLoop();
	frameRate(0.5);
}

function drawFancyShape(x, y, d, angle) {
	let ratio = 1;
	let shape_num = int(random(5));
	let dd = d * ratio;
	push();
	translate(x, y);
	rotate(angle);
	scale(random(100) > 50 ? -1 : 1,
		random(100) > 50 ? -1 : 1);
	switch (shape_num) {
		case 0:
			arc(0, 0, dd, dd, 0, 180, PIE);
			break;
		case 1:
			triangle(-dd / 2, 0, dd / 2, 0, 0, -dd / 2);
			break;
		case 2:
			triangle(-dd / 2, -dd / 2, -dd / 2, 0, dd / 2, 0);
			break;
		case 3:
			rect(-dd / 2, 0, dd, dd / 2);
			break;
		case 4:
			rect(-dd / 2, 0, dd / 2, dd / 2);
			rect(dd / 2, 0, -dd / 2, -dd / 2);
			break;
	}
	pop();
}


function createPalette(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');
	for (let i = 0; i < arr.length; i++) {
		arr[i] = color('#' + arr[i]);
	}
	return arr;
}