let alphabet = "abcdefghijklmnopqrstuvwxyz";
let graphices_over = [];
let graphices_under = [];
let font;
let texture;

let url = "https://coolors.co/0081a7-00afb9-fdfcdc-fed9b7-f07167";
let palette;

function preload() {
	font = loadFont("Lato-Black.ttf");
}

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	palette = createPalette(url);


	alphabet = alphabet.toUpperCase();
	let tsize = width * 0.9;
	for (let i = 0; i < alphabet.length; i++) {
		let c1 = random(palette);
		let c2 = random(palette);
		while (c1 == c2) {
			c1 = random(palette);
		}

		let g = createGraphics(width, height);
		g.colorMode(HSB, 360, 100, 100, 100);
		g.angleMode(DEGREES);

		let g2 = createGraphics(width, height);
		g2.colorMode(HSB, 360, 100, 100, 100);
		g2.angleMode(DEGREES);

		let str = alphabet.substr(i, 1);
		let bound = font.textBounds(str, 0, 0, tsize);
		let cx = -(bound.x + bound.w) / 2;
		let cy = bound.h / 2;

		g.push();
		g.translate(width / 2, height / 2);
		g.translate(cx, cy);
		g.textSize(tsize);
		g.textFont(font);
		g.fill(c2);
		g.noStroke();
		g.text(str, 0, 0);
		g.pop();

		g2.push();
		g2.translate(width / 2, height / 2);
		g2.translate(cx, cy);
		g2.textSize(tsize);
		g2.textFont(font);
		g2.noStroke();
		g2.fill(c1);
		g2.text(str, 0, 0);
		g2.pop();

		graphices_under.push(g2);

		for (let j = 0; j < 100; j++) {
			g.erase();
			g.ellipse(random(width),
				random(height),
				random(width / 6));
			g.noErase();
		}
		// image(g, 0, 0);
		graphices_over.push(g);
	}

	texture = createGraphics(width, height);
	texture.colorMode(HSB, 360, 100, 100, 100);
	texture.angleMode(DEGREES);

	texture.stroke(0, 0, 0, 2);
	for (let i = 0; i < width * height * 0.5 / 100; i++) {
		let x = random(width);
		let y = random(height);
		let angle = 90 + random(10) * (random(100) > 50 ? -1 : 1);
		let d = width / 5;
		texture.line(x + cos(angle) * d, y + sin(angle) * d,
			x + cos(angle + 180) * d, y + sin(angle + 180) * d);
	}

}

function draw() {
	background(0, 0, 95);
	separateGrid(0, 0, width);
	image(texture, 0, 0);
	frameRate(1);
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 5) {
				separateGrid(i, j, w);
			} else {
				let num = int(random() * graphices_under.length);
				drawingContext.shadowColor = color(0, 0, 0, 33);
				drawingContext.shadowBlur = w / 10;
				image(graphices_under[num], i, j, w, w);
				drawingContext.shadowColor = color(0, 0, 100, 100);
				drawingContext.shadowBlur = w / 10;
				image(graphices_over[num], i, j, w, w);
				// rect(i,j,w,w);
			}
		}
	}
}

function createPalette(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');

	for (let i = 0; i < arr.length; i++) {
		let red = unhex(arr[i].substr(0, 2));
		let green = unhex(arr[i].substr(2, 2));
		let blue = unhex(arr[i].substr(4, 2));
		colorMode(RGB, 255, 255, 255);
		let c = color(red, green, blue);
		let h = hue(c);
		let s = saturation(c);
		let b = brightness(c);
		let t = 100;
		colorMode(HSB, 360, 100, 100, 100);
		c = color(h, s, b, t);
		arr[i] = c;
	}
	return arr;
}