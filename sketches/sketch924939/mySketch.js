let url = "https://coolors.co/ffadad-ffd6a5-fdffb6-caffbf-9bf6ff-a0c4ff-bdb2ff-ffc6ff-fffffc";
let palette = createPalette(url);
let canvas;
let rs;

function setup() {
	canvas = createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	rc = rough.canvas(document.getElementById('defaultCanvas0'));
}

function draw() {
	background(0, 0, 20);
	separateGrid(0, 0, width);
	frameRate(1);
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 15) {
				separateGrid(i, j, w);
			} else {
				let c1 = color(random(palette));
				let c2 = color(random(palette));
				while (c1 == c2) {
					c2 = color(random(palette));
				}
				drawingContext.shadowColor = color(c1);
				drawingContext.shadowBlur = w / 10;
				let options = {
					roughness: w / 60,
					fill: c1,
					hachureAngle: 45 + int(random(4)) * 360 / 4,
					hachureGap: w / 40,
					fillWeight: w / 200,
					stroke: c2,
					strokeWidth: w / 100,
				};

				if (random(100) > 50) {
					rc.rectangle(i + w / 10, j + w / 10, w * 8 / 10, w * 8 / 10, options);
				} else {
					rc.circle(i + w / 2, j + w / 2, w * 8 / 10, options);

				}
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