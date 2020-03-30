let graphics;
let font;
let hiragana = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん"
let katakana = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
let bg;

function preload() {
	font = loadFont("NotoSerifJP-Bold.otf");
}

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	frameRate(1);

	bg = createGraphics(width, height);
	bg.colorMode(HSB, 360, 100, 100, 100);
	bg.fill(0, 0, 0, 15);
	for (let i = 0; i < width * height * 10 / 100; i++) {
		let radius = sqrt(sq(width / 2) + sq(height / 2));
		let angle = random(360);
		let r = 1 - (random(random(random(1))));
		let x = width / 2 + r * radius * cos(angle);
		let y = height / 2 + r * radius * sin(angle);
		let w = random(3);
		let h = random(3);
		bg.noStroke();
		bg.ellipse(x, y, w, h);
	}
}

function draw() {
	background(255);
	image(bg, 0, 0);
	let str = hiragana.substr(int(random(katakana.length)), 1);
	let tSize = width * 0.9;
	graphics = createGraphics(width / 2, height);
	graphics.textFont(font);
	graphics.textSize(tSize);
	let bound = font.textBounds(str, 0, 0, tSize);
	graphics.translate(-bound.x, -bound.y);
	let x = -bound.w / 2;
	let y = -bound.h / 2;
	if (random(100) > 50) {
		graphics.translate(width / 2, height / 2);
		graphics.text(str, x, y);
		image(graphics, 0, 0);
		translate(width, 0);
		scale(-1.0, 1.0);
		image(graphics, 0, 0);
	} else {
		graphics.translate(width / 2, height / 2);
		graphics.text(str, x - bound.w / 2, y);
		image(graphics, width / 2, 0);
		translate(0, 0);
		scale(-1.0, 1.0);
		image(graphics, -width / 2, 0);
	}
}