let alphabet = "abcdefghijklmnopqrstuvwxyz";
let graphices = [];
let alphabets = [];
// let url = "https://coolors.co/0081a7-00afb9-fdfcdc-fed9b7-f07167";
let palette = ["#10111C", "#23AECC", "#ECE1B4", "#CC3016", "#F2C96E", "#178FA6"];
let layerOver, layerUnder;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	layerOver = createGraphics(width, height);
	layerOver.colorMode(HSB, 360, 100, 100, 100);
	layerOver.angleMode(DEGREES);

	layerUnder = createGraphics(width, height);
	layerUnder.colorMode(HSB, 360, 100, 100, 100);
	layerUnder.angleMode(DEGREES);

	// palette = createPalette(url);
	for (let i = 0; i < alphabet.length; i++) {
		let g = createGraphics(width, height);
		g.colorMode(HSB, 360, 100, 100, 100);
		g.angleMode(DEGREES);
		let letter = alphabet.toUpperCase().substr(i, 1);
		g.textSize(width);
		g.textStyle(BOLD);
		g.fill(0, 0, 50);
		g.textAlign(CENTER, CENTER);
		g.text(letter, width / 2, height / 2);
		alphabets.push(g);

		let g2 = createGraphics(width, height);
		g2.colorMode(HSB, 360, 100, 100, 100);
		g2.angleMode(DEGREES);

		separateRect(0, 0, width, g2);
		graphices.push(g2);
	}
}

function draw() {
	layerUnder.clear();
	layerUnder.background(0, 0, 50);
	layerOver.clear();
	layerOver.background(0, 0, 90);
	separateGrid(0, 0, width, this);

	image(layerUnder, 0, 0);
	image(layerOver, 0, 0);
	frameRate(1);
}

function separateRect(x, y, d, g) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 5) {
				separateRect(i, j, w, g);
			} else {
				let c = random(palette);
				g.fill(c);
				g.noStroke();
				g.drawingContext.shadowColor = color(c);
				g.drawingContext.shadowBlur = w/2;	
				g.circle(i + w / 2, j + w / 2, w);
			}
		}
	}
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 3) {
				separateGrid(i, j, w);
			} else {
				layerUnder.image(random(graphices), i, j, w, w);
				let letter = alphabet.toUpperCase().substr(int(random(alphabet.length)), 1);

				layerOver.push();
				layerOver.textSize(w * 1.15);
				layerOver.textFont("Helvetica");
				layerOver.textStyle(BOLD);
				layerOver.fill(0, 0, 50);
				layerOver.textAlign(CENTER, CENTER);
				layerOver.push();
				layerOver.drawingContext.shadowColor = color(0, 0, 0, 50);
				layerOver.drawingContext.shadowBlur = w / 10;
				layerOver.text(letter, i + w / 2, j + w / 2);
				layerOver.pop();

				layerOver.erase();
				layerOver.text(letter, i + w / 2, j + w / 2);

				layerOver.noErase();
				layerOver.pop();
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