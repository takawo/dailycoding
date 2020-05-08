let font;
let tSize = 150;
let gs = [];
let hue = 90;
let texture;
let rs, ns;

function preload() {
	font = loadFont("SawarabiMincho-Regular.ttf");
}

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	rs = random(10000);
	ns = random(10000);
	for (let i = 0; i < 3; i++) {
		let b = font.textBounds("自己暗示", 0, 0, tSize);
		let g = createGraphics(b.w, b.h);
		g.colorMode(HSB, 360, 100, 100, 100);
		g.textFont(font);
		g.textSize(tSize);
		g.fill((hue + i * 360 / 3) % 360, 100, 100);
		g.text("自己暗示", -b.x, -b.y);
		gs.push(g);
	}

	texture = createGraphics(width, height);
	texture.colorMode(HSB, 360, 100, 100, 100);
	texture.angleMode(DEGREES);
	texture.stroke(0, 0, 100, 20);
	for (let i = 0; i < width * height * 20 / 100; i++) {
		let r = (1 - random(random())) * sqrt(width * width + height * height) / 2;
		let angle = random(360);
		let x = width / 2 + cos(angle) * r;
		let y = height / 2 + sin(angle) * r;
		texture.point(x, y);
	}
}

function draw() {
	background(0);
	blendMode(SCREEN);
	for (let i = 0; i < 3; i++) {
		let g = gs[i];
		drawingContext.shadowColor = color((hue + i * 360 / 3) % 360, 100, 100);
		let y = 0;
		let gx = 0;
		randomSeed(rs);
		noiseSeed(ns);
		while (y < height) {
			let x = 0;
			while (x < width) {
				let xStep = int(random(1, 5)) * 7;
				let n = noise(i / 5, x / 5, y / 5);
				let gg;
				gx %= g.width;
				if (n > 0.5) {
					gg = g.get(gx, 0, xStep, g.height);
					gx += xStep;
				} else {
					gg = g.get(gx, 0, 1, g.height);
					gx += 1;
				}
				drawingContext.shadowBlur = xStep;
				image(gg, x, y + (n - 0.5) * g.height / 8, xStep, g.height);
				x += xStep;
			}
			y += g.height;
		}
	}
	image(texture, 0, 0);
	noLoop();
}