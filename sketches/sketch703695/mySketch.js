// I referred to @reona396's article to generate an array of emoji in this code.?
// http://blog.livedoor.jp/reona396/archives/55760887.html

let cells, cols, rows;
let offset, margin;
let w, h;
let emojiArr = [];
let noiseScale;
let noiseSeedValue;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	init();
	emojiArr = createEmojiArr();
}

function createEmojiArr() {
	let arr = [];
	for (let i = 128512; i < 128592; i++) {
		arr.push(i);
	}
	for (let i = 127744; i < 128318; i++) {
		arr.push(i);
	}
	return arr;
}

function init() {
	cells = int((1 - random(random())) * 7 + 3) * 3;
	cols = cells;
	rows = cells;
	offset = width / cells;
	margin = offset / 3;

	noiseScale = 2000 + cells * 200;
	noiseSeedValue = random(10000);
	noiseSeed(noiseSeedValue);

	w = (width - offset * 2 - margin * (cols - 1)) / cols;
	h = (height - offset * 2 - margin * (rows - 1)) / rows;
}

function draw() {
	background(0, 0, 10);
	if (frameCount % 200 == 0) {
		init();
	}

	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			let x = map(i, 0, cols - 1, offset, width - offset - w);
			let y = map(j, 0, rows - 1, offset, height - offset - h);
			let cx = x + w / 2;
			let cy = y + h / 2;
			// rectMode(CENTER);
			// rect(cx, cy, w, h);
			textAlign(CENTER, CENTER);
			textSize(w);
			let n = noise(x / noiseScale, y / noiseScale, frameCount * 1.5 / noiseScale);
			let cn = int(map(n, 0, 1, 0, emojiArr.length));
			let emoji = String.fromCodePoint(emojiArr[cn]);
			push();
			translate(cx,cy);
			rotate(90);
			text(emoji, 0,0);
			pop();
		}
	}
}