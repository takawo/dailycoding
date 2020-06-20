let layer;
let current = 0;
let target = 1;
let graphics;
let url = "https://coolors.co/0b3954-087e8b-bfd7ea-ff5a5f-c81d25";
let palette = createPalette(url);
let img, img_other, sx, sw;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	layer = createGraphics(200, 200);
	layer.colorMode(HSB, 360, 100, 100, 100);
	layer.angleMode(DEGREES);

	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	graphics.angleMode(DEGREES);
	drawingContext.shadowColor = color(0, 0, 0, 33);
	drawingContext.shadowBlur = 20;
	layer.drawingContext.shadowColor = color(0, 0, 0, 33);
	layer.drawingContext.shadowBlur = 10;

}

function draw() {
	background(0, 0, 90);

	randomSeed(frameCount / 100);
	graphics.clear();

	let deltaTime = 1 / 120;
	let k = 8;
	current = lerp(target, current, exp(-k * deltaTime));

	let size = map(sin(frameCount), -1, 1, layer.width / 8, layer.width / 2);
	// layer.background(0,0,100);
	// layer.clear();
	layer.noStroke();
	layer.ellipse(layer.width / 2 + cos(frameCount * 3.3) * layer.height / 5,
		layer.height / 2 + sin(frameCount * 4.2) * layer.height / 5, size);

	sx = current * layer.width;
	sw = layer.width - sx;
	img = layer.get(sx, 0, max(sw, 1), layer.height);
	img_other = layer.get(0, 0, sx, layer.height);

	separateGrid(0, 0, width, graphics);
	image(graphics, 0, 0);
	if (current > 0.999) {
		current = 0;
	}

}

function separateGrid(x, y, d, g) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 3) {
				separateGrid(i, j, w, g);
			} else {

				let dx = i;
				let dy = j;
				let dw = w;
				let dh = w;

				g.push();
				g.translate(dx + dw / 2, dy + dh / 2);
				g.rotate(int(random(4)) * 360 / 4);
				g.translate(-dw / 2, -dh / 2);
				g.image(img, 0, 0, dw * sw / layer.width, dh);
				g.image(img_other, dw * sw / layer.width, 0, dw - dw * sw / layer.width, dh);
				g.pop();

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