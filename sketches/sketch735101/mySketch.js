let img;
let graphics;
let font;


function preload() {
	img = loadImage("me.png");
	font = loadFont("DMSerifDisplay-Italic.ttf");
}

function setup() {
	createCanvas(500, 500);
	colorMode(HSB, 360, 100, 100, 100);
	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	drawNoiseBackground(100000, graphics, 100);

	textFont(font);
	textSize(width / 8);
	textAlign(CENTER, CENTER);
}

function draw() {

	let stepX = 15;
	let stepY = 15;
	let noiseScaleX = 400;
	let noiseScaleY = 400;
	let timeScale = 400;
	let f = frameCount * 3;
	blendMode(BLEND);

	for (let y = 0; y < height; y += stepY) {
		for (let x = 0; x < width; x += stepX) {
			let n = noise(x / noiseScaleX, (y + f / 5) / noiseScaleY, f / timeScale);
			n = map(n, 0, 1, 100, 0);
			fill(0, 0, n);
			noStroke();
			rect(x, y, stepX, stepY);
		}
	}
	image(img, 0, 0);

	blendMode(MULTIPLY);
	fill(0, 100, 100);
	rect(0, 0, width, height);

	blendMode(LIGHTEST);
	fill(220, 70, 20);
	rect(0, 0, width, height);

	blendMode(BLEND);
	image(graphics, 0, 0);
	fill(0, 0, 100);
	text("DUOTONE", width / 2, height / 2);
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

function drawNoiseBackground(_n, _graphics, _brightness) {
	let c = color(0, 0, _brightness, 3);
	for (let i = 0; i < _n; i++) {
		let x = random(1) * width;
		let y = random(1) * height;
		let w = random(1, 2);
		let h = random(1, 2);
		_graphics.noStroke();
		_graphics.fill(c);
		_graphics.ellipse(x, y, w, h);
	}
}