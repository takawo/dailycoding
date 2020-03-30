let g;
let hiragana = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん"
let katakana = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
let bg;

function preload() {
	font = loadFont("NotoSerifJP-Bold.otf");
}

function setup() {
	createCanvas(800, 800);
	angleMode(DEGREES);
	frameRate(1);

	bg = createGraphics(width, height);
	bg.colorMode(HSB, 360, 100, 100, 100);
	bg.fill(0, 0, 0, 15);
	for (let i = 0; i < width * height * 20 / 100; i++) {
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
	background(220);
	image(bg, 0, 0);
	g = createGraphics(width, height);
	g.textSize(width);
	g.textAlign(CENTER);
	let arr = random(100) > 50 ? hiragana.concat() : katakana.concat();
	let str = arr.substr(int(random(arr.length)), 1);
	g.text(str, width / 2, height / 2 + height / 2.7);
	image(g, 0, 0);
	separateGrid(0, 0, width, g)
}

function separateGrid(x, y, d, img) {
	let sepNum = int(random(2, 6));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (d > width / 3) {
				separateGrid(i, j, w, img);
			} else {
				let c = img.get(i + w / 2, j + w / 2);
				if (alpha(c) > 30) {
					push();
					translate(i, j);
					noStroke();
					fill(red(c),green(c),blue(c),random(200,255));
					rect(0, 0, w, w);
					pop();
				}
			}
		}
	}
}