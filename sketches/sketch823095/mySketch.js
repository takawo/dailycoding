let graphics;
let img;
let url = "https://coolors.co/app/e63946-f1faee-a8dadc-457b9d-1d3557";
let pallete = [];

function setup() {
	createCanvas(800, 800, WEBGL);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	blendMode(ADD);
	pallete = createPallete(url);

	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);

	for (let i = 0; i < 50000; i++) {
		graphics.stroke(0, 0, 100, 10);
		graphics.point(random(width), random(height));
	}
	img = createImage(width, height);
	img.copy(graphics, 0, 0, graphics.width, graphics.height, 0, 0, graphics.width, graphics.height);
}

function draw() {
	background(0, 0, 0);
	let w = sqrt(width * width + height * height);

	rotateX(frameCount / 3);
	rotateY(frameCount / 4);
	rotateZ(frameCount / 5);
	for (let z = -w / 2; z < w / 2; z += w / 15) {
		for (let y = -w / 2; y < w / 2; y += w / 10) {
			for (let x = -w / 2; x < w / 2; x += w / 10) {
				let n = noise((x + frameCount) / 400, (y + frameCount) / 400, (z - frameCount * 50) / 4000);
				if (n > 0.5) {
					push();
					translate(x, y, z);
					let cNum = round(map(n, 0.5, 1, 0, pallete.length + 1));
					fill(pallete[cNum]);
					box(w / 10, w / 10, 1);
					pop();
				}

			}
		}
	}
	let v = -2000 + sin(frameCount) * 300;
	camera(0, 0, v, 0, 0, 0, 0, 1, 0);
	push();
	translate(0, 0, v + w * 2);
	noStroke();
	texture(img);
	plane(w * 3);
	pop();
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