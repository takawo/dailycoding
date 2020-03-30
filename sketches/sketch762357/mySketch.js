let data;
let graphics;

function preload() {
	let url = 'https://gist.githubusercontent.com/shinout/1403826/raw/421d01202c4b065cd2c4c5f4294492bd2d8809b8/jis1_regular_merged.json';
	data = loadJSON(url);
}

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);

	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	graphics.textFont("serif");

	for (let i = 0; i < width * height * 2.5 / 100; i++) {
		graphics.fill(0, 0, 100, 0.25);
		graphics.noStroke();
		graphics.ellipse(
			random(width),
			random(height),
			random(3),
			random(3)
		);
	}
}

function draw() {
	background(0, 0, 10);
	separateGrid(0, 0, width);
	frameRate(.5);
}

function separateGrid(x, y, d) {
	let sepNum = int(random(2, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 5) {
				separateGrid(i, j, w);
			} else {
				let str = data[int(random(Object.keys(data).length))];

				if (random(100) < 50) {
					let g = createGraphics(ceil(w / 2), w);
					g.colorMode(HSB, 360, 100, 100, 100);
					g.textSize(w);
					g.textAlign(CENTER, CENTER);
					g.fill(0, 0, 90);
					g.text(str, w / 2, w / 2 + w / 8);
					push();
					translate(i, j);
					image(g, 0, 0);
					translate(w, 0);
					scale(-1.0, 1.0);
					image(g, 0, 0);
					pop();
				} else {
					let g = createGraphics(w, ceil(w / 2));
					g.colorMode(HSB, 360, 100, 100, 100);
					g.fill(0, 0, 90);
					g.textSize(w);
					g.textAlign(CENTER, CENTER);
					g.text(str, w / 2, w / 2 + w / 8);
					push();
					translate(i, j);
					image(g, 0, 0);
					translate(0, w);
					scale(1.0, -1.0);
					image(g, 0, 0);
					pop();

				}
			}
		}
	}
	image(graphics, 0, 0);
}