let str = "ﾁｮｰﾎﾝﾆﾝ弓長本人てか超本人www酩酊本気卍俺誰が見ても信じてもらえないかもだけど（笑）";
let tSize = 50;
let font;
let g;
let rs;
let ns;
let textureGraphics;

function preload() {
	font = loadFont("NotoSerifJP-ExtraLight.otf");
}

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	drawingContext.imageSmoothingEnabled = false;
	let b = font.textBounds(str, 0, 0, tSize);
	g = createGraphics(b.w, b.h);
	g.colorMode(HSB, 360, 100, 100, 100);
	g.textFont(font);
	g.textSize(tSize);
	g.fill(0, 0, 0);
	g.text(str, -b.x, -b.y);

	rs = random(10000);
	ns = random(10000);

	let offset = width / 10;
	textureGraphics = createGraphics(width, height);
	textureGraphics.colorMode(HSB, 360, 100, 100, 100);
	textureGraphics.angleMode(DEGREES);
	textureGraphics.fill(0, 0, 0, 50);
	textureGraphics.noStroke();

	for (let i = 0; i < 1000 / 2; i++) {
		textureGraphics.rect(random(-offset, width + offset), random(-offset, height + offset), random(offset), random(5));
	}

}

function draw() {
	background(0, 0, 95);
	let y = 0;
	let gx = 0;
	randomSeed(rs);
	noiseSeed(ns);
	while (y < height) {
		let yStep = random(g.height / 2, g.height * 3);
		let x = 0;
		while (x < width) {
			let xStep = int(random(1, 5)) * 7;
			let n = noise(x, y / 5);
			let gg;
			gx %= g.width;
			if (n > 0.55) {
				gg = g.get(gx, 0, xStep, g.height);
				gx += xStep;
			} else {
				gg = g.get(gx, 0, 1, g.height);
				gx += 1;
			}
			drawingContext.shadowColor = color(0, 0, 0, 80);
			drawingContext.shadowBlur = yStep / 4;
			drawingContext.shadowOffsetY = xStep / 2;
			drawingContext.shadowOffsetY = yStep / 4;

			image(gg, x, y + (n - 0.5) * g.height / 8, xStep, yStep);
			x += xStep;
		}
		y += yStep;
	}
	image(textureGraphics, 0, 0);
	noLoop();
}