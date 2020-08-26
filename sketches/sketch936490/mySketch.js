let rows, offset, margin, w, h;
// let url = "https://coolors.co/f94144-f3722c-f8961e-f9c74f-90be6d-43aa8b-577590";
let url = [
	"https://coolors.co/3d5a80-98c1d9-e0fbfc-ee6c4d-293241",
	"https://coolors.co/0081a7-00afb9-fdfcdc-fed9b7-f07167",
	"https://coolors.co/9c89b8-f0a6ca-efc3e6-f0e6ef-b8bedd",
	"https://coolors.co/390099-9e0059-ff0054-ff5400-ffbd00",
	"https://coolors.co/011627-fdfffc-2ec4b6-e71d36-ff9f1c",
];
let palette;
let bg;
let texture;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	texture = createGraphics(width, height);
	texture.colorMode(HSB, 360, 100, 100, 100);
	texture.angleMode(DEGREES);

	texture.stroke(0, 0, 100, 2);
	for (let i = 0; i < width * height * 0.5 / 100; i++) {
		let x = random(width);
		let y = random(height);
		let angle = 90 + random(10) * (random(100) > 50 ? -1 : 1);
		let d = width / 5;
		texture.line(x + cos(angle) * d, y + sin(angle) * d,
			x + cos(angle + 180) * d, y + sin(angle + 180) * d);
	}
	init();
}

function init() {

	palette = createPalette(random(url));
	rows = int(random(3, 10));
	offset = width / 10;
	margin = 0;
	offset / 5;

	h = (height + offset * 2 - margin * (rows - 1)) / rows;
	w = width + offset * 2;
}

function draw() {

	background(0, 0, 90);

	for (let i = 0; i < rows; i++) {
		let x = -offset;
		let y = -offset + i * (h + margin);
		// rect(x, y, w, h);
		let freq = 1 / random(0.5, 2);
		let n = int(random(2));
		for (let j = 0; j < 2; j++) {
			let kStep = int(random(1, 5));
			for (let k = kStep; k > 0; k--) {
				let colors = shuffle(palette.concat(), true);
				push();
				translate(x, y + h / 2);
				let gradient = drawingContext.createLinearGradient(0, 0, w, 0);
				for (let i = 0; i < colors.length; i++) {
					gradient.addColorStop(i / (colors.length - 1), colors[i]);

				}
				// gradient.addColorStop(random(0.2, 0.8), colors[1]);
				// gradient.addColorStop(1, colors[2]);

				drawingContext.fillStyle = gradient;
				drawingContext.shadowColor = color(0, 0, 0, 33);
				drawingContext.shadowBlur = h / 5;

				// fill(colors[j]);
				noStroke();
				beginShape();
				for (let xx = 0; xx < w; xx++) {
					let yy = constrain(sin(xx * freq + y * 3) * h, -h / 2 * k / kStep, h / 2 * k / kStep);
					vertex(xx, yy);
				}
				if ((n + j) % 2 == 0) {
					vertex(w, h / 2 * k / kStep);
					vertex(0, h / 2 * k / kStep);
				} else {
					vertex(w, -h / 2 * k / kStep);
					vertex(0, -h / 2 * k / kStep);
				}
				endShape(CLOSE);
				pop();
			}
		}

	}
	noLoop();
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