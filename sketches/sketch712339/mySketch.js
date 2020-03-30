let url = "https://coolors.co/app/22223b-4a4e69-9a8c98-c9ada7-f2e9e4";
let pallete;
let graphics;

const canvasStandard = 700;
const strArr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ./!?";
const ratio = 0.9;

let layers = [];
let cols, rows;
let cellW, cellH;
let offset, margin;
let noiseScale = 800;
let font;

function preload() {
	font = loadFont("AbrilFatface-Regular.ttf");
}


function setup() {
	cols = 5;
	rows = 6;
	let w = canvasStandard * cols / cols;
	let h = canvasStandard * rows / cols;

	createCanvas(w, h);

	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	pallete = createPallete(url);
	let bn = int(random(pallete.length));
	bc = pallete[bn]
	pallete.splice(bn, 1);
	background(bc);

	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	drawNoiseBackground(100000, graphics);

	offset = width / 20;
	margin = offset / 5;

	cellW = (width - (offset * 2) - margin * (cols - 1)) / cols;
	cellH = (height - (offset * 2) - margin * (rows - 1)) / rows;

	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			let x = map(i, 0, cols - 1, offset, width - offset - cellW);
			let y = map(j, 0, rows - 1, offset, height - offset - cellH);

			let n = j * cols + i;
			let str = strArr.substr(n, 1);

			let cn1 = int(random(pallete.length));
			let cn2 = cn1;
			while (cn1 == cn2) {
				cn2 = int(random(pallete.length));
			}
			let c1 = pallete[cn1]+"99";
			let c2 = pallete[cn2]+"99";

			let g = createGraphics(cellW, cellH);
			g.colorMode(HSB, 360, 100, 100, 100);
			g.textAlign(CENTER, CENTER);
			g.textFont(font);
			g.textSize(cellW * ratio);
			g.fill(c1);
			g.text(str, cellW / 2, cellH / 2 - cellW / 5);

			let g2 = createGraphics(cellW, cellH);
			g2.colorMode(HSB, 360, 100, 100, 100);
			g2.textAlign(CENTER, CENTER);
			g2.textFont(font);
			g2.textSize(cellW * ratio);
			g2.fill(c2);
			g2.text(str, cellW / 2, cellH / 2 - cellW / 5);

			let b = new Bound(x, y, cellW, cellH);
			let l = new Layer(g, b);

			if (random(100) > 50) {
				image(g2, x, y);
				l.display();
			} else {
				l.display();
				image(g2, x, y);
			}
		}
	}
	image(graphics, 0, 0);
}

class Layer {
	constructor(_g, _b) {
		this.g = _g;
		this.b = _b;
		this.sepG = createGraphics(this.g.width, this.g.height);
		this.separate();
	}
	separate() {
		let n = int(random(3, 10));
		let step = sqrt(n);
		let cols = n;
		let rows = n;
		let cellW = this.b.w / cols;
		let cellH = this.b.w / cols;
		for (let j = 0; j < rows; j++) {
			for (let i = 0; i < cols; i++) {
				let x = map(i, 0, cols, 0, this.g.width);
				let y = map(j, 0, rows, 0, this.g.height);
				let waveX = int(sin((y) * 5) * cellW);
				let waveY = int(sin((x) * 5) * cellH);
				x += waveX;
				y += waveY;
				let g = createGraphics(cellW, cellH);
				g.copy(this.g,
					x, y, cellW, cellH,
					random(-cellW / step, cellW / step), random(-cellH / step, cellH / step), cellW, cellH);
				this.sepG.image(g, x, y);
			}
		}
	}
	display() {
		image(this.sepG, this.b.x, this.b.y, this.b.w, this.b.h);
	}
}

class Bound {
	constructor(_x, _y, _w, _h) {
		this.x = _x;
		this.y = _y;
		this.w = _w;
		this.h = _h;
	}
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

function drawNoiseBackground(_n, _graphics) {
	let c = color(0, 0, 0, 3);
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