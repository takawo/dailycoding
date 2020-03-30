let graphics;
let font;
let hiragana = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";
let katakana = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
let bg;

function preload() {
	font = loadFont("NotoSerifJP-ExtraLight.otf");
}

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

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
	background(0, 0, 90);
	separateGrid(0, 0, width);
	image(bg, 0, 0);
	//frameRate(1);
	noLoop();
}

function separateGrid(x, y, d) {
	let sepNum = int(random(2, 6));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 10) {
				separateGrid(i, j, w);
			} else {
				let kCount = 2;
				for (let k = 0; k < kCount; k++) {
					let str = "";
					if (random(100) < 50) {
						str = hiragana.substr(int(random(katakana.length)), 1);
					} else {
						str = katakana.substr(int(random(katakana.length)), 1);
					}
					let tSize = w * 0.95;
					graphics = createGraphics(w / 2, w);
					graphics.textFont(font);
					graphics.textSize(tSize);
					let bound = font.textBounds(str, 0, 0, tSize);
					graphics.translate(-bound.x, -bound.y);
					let x = -bound.w / 2;
					let y = -bound.h / 2;
					push();
					translate(i, j);
					if (random() > 0.5) {
						graphics.translate(w / 2, w / 2);
						graphics.text(str, x, y);
						image(graphics, 0, 0);
						translate(w, 0);
						scale(-1.0, 1.0);
						image(graphics, 0, 0);
					} else {
						graphics.translate(w / 2, w / 2);
						graphics.text(str, x - bound.w, y);
						image(graphics, w / 2, 0);
						translate(0, 0);
						scale(-1.0, 1.0);
						image(graphics, -w / 2, 0);
					}
					pop();
				}
			}
		}
	}
}