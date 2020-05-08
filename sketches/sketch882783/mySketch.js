let code, str;
let ns = 1000,
	rs = 1000;
let m;

function preload() {
	code = loadStrings("sketch.js");
}

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	textFont("monospace");
	for (let s of code) {
		str += s;
		str += "\n";
	}
}

function draw() {
	background(0, 0, 95);
	randomSeed(rs);
	noiseSeed(ns);
	let w = sqrt(sq(width) + sq(height));
	m = frameCount % str.length;
	push();
	translate(width / 2, height / 2);
	// rotate(int(random(8)) * 360 / 8);
	separateGrid(-w / 2, -w / 2, w);
	pop();

	if (frameCount % 100 == 0) {
		ns = random(500, 2000);
		rs = random(500, 2000);
	}
	// noLoop();
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			let n = noise(i / ns, j / ns, frameCount / ns);
			if (n > 0.25 && d > width / 10) {
				separateGrid(i, j, w);
			} else {
				push();
				translate(i + w / 2, j + w / 2);
				// rotate(int(random(8))*360/8);
				textSize(w * 0.9);
				textAlign(CENTER, CENTER);
				text(str.substr(m, 1), 0, 0);
				m = (m + 1) % str.length;
				pop();
			}
		}
	}
}