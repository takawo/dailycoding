let url = "https://coolors.co/f4f1de-e07a5f-3d405b-81b29a-f2cc8f";
let palette = createPalette(url);

let layers = [];
let graphics;
let current = 0;
let target = 1;
let rs;
let count = 1;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	drawingContext.imageSmoothingEnabled = false;
	for (let i = 0; i < palette.length; i++) {
		let layer = createGraphics(10, 10);
		layer.colorMode(HSB, 360, 100, 100, 100);
		layer.angleMode(DEGREES);
		layers.push(layer);
	}
	rs = random(1000);
}

function draw() {
	blendMode(BLEND);
	background(0, 0, 95);

	let deltaTime = 1 / 120;
	let k = 8;
	current = lerp(target, current, exp(-k * deltaTime));

	let i = 0;
	for (let layer of layers) {
		layer.background(palette[(i + palette.length - 1) % palette.length]);
		let y = layer.height / 2;
		layer.rectMode(CENTER);
		layer.noStroke();
		for (let j = 0; j < palette.length; j++) {
			let n = (j + i) % palette.length;
			layer.fill(palette[n]);
			layer.drawingContext.shadowColor = color(palette[n] + hex(100, 2));
			layer.drawingContext.shadowBlur = layer.width / 4;
			let size = layer.width * 0.66 * (palette.length - j) / palette.length;
			let x = (map(current, 0, 1, 0, layer.width + size) + layer.width / 2) % (layer.width + size);
			layer.ellipse(x, y, size, size);
		}
		i++;
	}
	randomSeed(rs);
	separateGrid(0, 0, width);
	if (current > 0.999) {
		current = 0;
		count++;
	}
	if (count % 5 == 0) {
		rs = random(1000);
		count++;
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
				push();
				translate(i + w / 2, j + w / 2);
				rotate(int(random(4) + count) * 360 / 4);
				imageMode(CENTER);
				image(random(layers), 0, 0, w, w);
				pop();
			}
		}
	}
}

function pgMask(_content, _mask) {
	let img = createImage(_mask.width, _mask.height);
	img.copy(_mask, 0, 0, _mask.width, _mask.height, 0, 0, _mask.width, _mask.height);
	var contentImg = createImage(_content.width, _content.height);
	contentImg.copy(_content, 0, 0, _content.width, _content.height, 0, 0, _content.width, _content.height);
	contentImg.mask(img)
	return contentImg;
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