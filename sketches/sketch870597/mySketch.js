let symbols = [];
let json;
let tSize;
let font;

let texture;

function preload() {
	json = loadJSON("alchemist.json", function() {
		for (let i = 0; i < Object.keys(json).length; i++) {
			let data = json[i];
			symbols.push(data);
		}
	});

}

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	texture = createGraphics(width, height);
	texture.colorMode(HSB, 360, 100, 100, 100);
	texture.angleMode(DEGREES);
	texture.stroke(0, 0, 100, 30);
	for (let i = 0; i < width * height * 20 / 100; i++) {
		let r = (1 - random(random())) * sqrt(width * width + height * height) / 2;
		let angle = random(360);
		let x = width / 2 + cos(angle) * r;
		let y = height / 2 + sin(angle) * r;
		texture.point(x, y);
	}

}

function draw() {
	blendMode(BLEND);
	background(0, 0, 0);
	image(texture, 0, 0);
	blendMode(ADD);
	let offset = width / 10;
	separateGrid(-offset, -offset, width + offset * 2, 30);
	// noLoop();
	frameRate(0.5);
}



function separateGrid(x, y, d, dMin) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && w > dMin) {
				separateGrid(i, j, w, dMin);
			} else {
				push();
				translate(i + w / 2, j + w / 2);
				rotate(int(random(4)) * 360 / 4);
				let symbol = random(symbols);
				textSize(w);
				textAlign(CENTER, CENTER);
				textFont("serif");
				fill(0, 0, 10);
				drawingContext.shadowColor = color(random(360), 100, 100);
				drawingContext.shadowBlur = w / 10;
				text(symbol.char, 0, -w / 6);
				drawingContext.shadowBlur = w * 2;
				text(symbol.char, 0, -w / 6);
				pop();
			}
		}
	}
}