let w;
let pallete = ["#222222", "#1F3E8E", "#D93B27", "#F15B0D", "#C6BFB7", "#6B2C15", "#399979"];
let bgColor;
let rs;
let graphics;
let colors;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	w = sqrt(width * width + height * height);
	rs = int(random(10000));
	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	graphics.noStroke();
	graphics.fill(0, 0, 100, 5);
	for (let i = 0; i < width * height * 15 / 100; i++) {
		let x = random(width);
		let y = random(height);
		let w = random(3);
		let h = random(3);
		graphics.ellipse(x, y, w, h);
	}
	colors = pallete.concat();
	let bgNum = int(random(colors.length));
	bgColor = colors[bgNum];
	colors.splice(bgNum, 1);
}

function draw() {
	if (frameCount % 100 == 0) {
		rs = int(random(10000));
		colors = pallete.concat();
		let bgNum = int(random(colors.length));
		bgColor = colors[bgNum];
		colors.splice(bgNum, 1);

	}
	randomSeed(frameCount / 100 + rs);

	background(bgColor);
	push();
	translate(width / 2, height / 2);
	rotate(45);
	separateGrid(-w / 2, -w / 2, w, colors);
	pop();
	image(graphics, 0, 0);
}

function separateGrid(x, y, d, colors) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 3) {
				separateGrid(i, j, w, colors);
			} else {
				drawSeparatedCircle(i + w / 2, j + w / 2, w, colors);
			}
		}
	}
}

function drawSeparatedCircle(x, y, rMax, colors) {
	let sum = 0;
	let noises = [];
	let sep = int(random(4, 9));
	let pvColor = -1;
	for (let i = 0; i < sep; i++) {
		let n = pow(noise(i * 100, frameCount / 100), 4);
		sum += n;
		noises.push(new Num(sum, n));
	}
	let startAngle = random(360) + noise(frameCount / 400) * 360;
	let firstColor = -1;
	for (let i = 0; i < sep; i++) {
		let angleStep = noises[i].num / sum * 360
		let angleA = startAngle;
		let angleB = angleA + angleStep;
		startAngle = angleB;
		let d = noise(angleStep / 100, frameCount / 400) * rMax;
		push();
		translate(x, y);
		let col = random(colors);
		while (col == pvColor || (i == sep - 1 && col == firstColor)) {
			col = random(colors);
		}
		fill(col);
		noStroke();
		pvColor = col;
		arc(0, 0, d, d, angleA, angleB, PIE);
		pop();
		if (i == 0) {
			firstColor = col;
		}
	}
}
class Num {
	constructor(sum, num) {
		this.sum = sum;
		this.num = num;
	}
}