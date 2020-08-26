//reference : christopher carlson's awesome article😁
//https://christophercarlson.com/portfolio/multi-scale-truchet-patterns/

let graphices = [];
let url = "https://coolors.co/e63946-f1faee-a8dadc-457b9d-1d3557";
// let url = "https://coolors.co/7400b8-6930c3-5e60ce-5390d9-4ea8de-48bfe3-56cfe1-64dfdf-72efdd-80ffdb";
// let url = "https://coolors.co/0466c8-0353a4-023e7d-002855-001845-001233-33415c-5c677d-7d8597-979dac";

let palette = createPalette(url);

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	for (let i = 0; i < palette.length; i++) {
		let c1 = random(palette);
		let c2 = random(palette);
		while (c1 == c2) {
			c2 = random(palette);
		}
		let g = createGraphics(width, height);
		g.colorMode(HSB, 360, 100, 100, 100);
		g.angleMode(DEGREES);
		g.push();
		g.translate(g.width / 2, g.height / 2);
		let d = int(g.width / 2);
		g.translate(-d / 2, -d / 2);
		g.noStroke();
		g.fill(c2);
		g.rect(0, 0, d, d);
		g.ellipse(0, 0, d * 2 / 3, d * 2 / 3);
		g.ellipse(0, d, d * 2 / 3, d * 2 / 3);
		g.ellipse(d, d, d * 2 / 3, d * 2 / 3);
		g.ellipse(d, 0, d * 2 / 3, d * 2 / 3);
		g.stroke(c1);
		g.strokeWeight(d * 1 / 3);
		g.noFill();
		g.arc(0, 0, d, d, 0, 90);
		g.arc(d, d, d, d, 0 + 180, 90 + 180);
		g.pop();
		graphices.push(g);
	}
}

function draw() {
	background(0, 0, 90);
	let offset = width / 10;
	separateGrid(offset, offset, width - offset * 2);
	noLoop();
}

function separateGrid(x, y, d) {
	let sepNum = 2;
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 80 && w > width / 5) {
				separateGrid(i, j, w);
			} else {
				// rect(i, j, w, w);
				let graphics = random(graphices);
				push();
				translate(i + w / 2, j + w / 2);
				rotate(int(random(4)) * 360 / 4);
				imageMode(CENTER);
				// drawingContext.shadowColor = color(0,0,0,15);
				// drawingContext.shadowBlur = w/10;
				image(graphics, 0, 0, w * 2, w * 2);
				pop();
			}
		}
	}
}

function createPalette(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');
	for (let i = 0; i < arr.length; i++) {
		arr[i] = '#' + arr[i];
	}
	return arr;
}