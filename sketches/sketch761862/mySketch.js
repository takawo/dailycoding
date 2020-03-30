let data;
let font;
let fonts = [];

let g;
let pallete = ["#030B45", "#DCB15B", "#E2656F", "#CD9B98", "#1840A4", "#F5E39E"];

let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function preload() {
	font = loadFont("NotoSerifJP-Black.otf");
	fonts.push(loadFont("NotoSerifJP-Black.otf"));
	fonts.push(loadFont("NotoSerifJP-Light.otf"));
	fonts.push(loadFont("NotoSerifJP-Medium.otf"));
	let url = 'https://gist.githubusercontent.com/shinout/1403826/raw/421d01202c4b065cd2c4c5f4294492bd2d8809b8/jis1_regular_merged.json';
	data = loadJSON(url);
}

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	g = createGraphics(width, height);
	g.colorMode(HSB, 360, 100, 100, 100);
	for (let i = 0; i < width * height * 5 / 100; i++) {
		g.fill(0, 0, 100, 7);
		g.noStroke();
		g.ellipse(
			random(width),
			random(height),
			random(1, 3),
			random(1, 3)
		);
	}
}


function draw() {
	colorMode(HSB, 360, 100, 100, 100);
	let colors = pallete.concat();
	background(0, 0, 95);
	let tsize = width * 0.75;

	let strNum = int(random(Object.keys(data).length));
	let str = data[strNum];
	let points = font.textToPoints(str, 0, 0, tsize, {
		sampleFactor: .5,
		simplifyThreshold: 0
	});
	let bound = font.textBounds(str, 0, 0, tsize);
	push();
	translate(width / 2, height / 2);
	let cx = -(bound.x + bound.w) / 2;
	let cy = -(bound.y) / 2;
	translate(cx, cy);
	textSize(tsize);
	textFont(font);
	fill(0, 0, 0, 50);
	text(str, 0, 0);
	let f = 0;
	let c1 = color(random(colors));
	let c2 = color(random(colors));
	while (c1 == c2) {
		c2 = color(random(colors));
	}
	for (let i = 0; i < points.length - 1; i++) {
		let current = points[i];
		let next = points[i + 1];
		let distance = dist(current.x, current.y,
			next.x, next.y);
		let angle = atan2(next.y - current.y, next.x - current.x);
		push();
		translate(current.x, current.y);
		rotate(angle);
		let step = int(random(1, 5)) / 25;
		for (let x2 = 0; x2 < distance; x2 += 1) {
			colorMode(RGB, 255, 255, 255, 255);
			let c = lerpColor(c1, c2, x2 / distance);
			stroke(0, 0, 100, 5);
			fill(red(c), green(c), blue(c), 128);
			let y2 = sin(f * 50) * tsize / 60;
			if (distance < tsize / 10) {
				ellipse(x2, y2, y2 * 2, y2 * 2);
			}
		}
		pop();
		f += step;
	}
	pop();
	frameRate(1);
	image(g, 0, 0);
}