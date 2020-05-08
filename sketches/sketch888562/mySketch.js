let str = "犯人ですね目撃者は私です犯行現場に着いたときあなただけおかしかったアリバイがありません";

let graphics;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	graphics.background(0, 0, 100);
}

function draw() {
	background(0, 0, 0);
	noLoop();
	textFont("serif");
	let offset = width / 10;
	separateGrid(-offset, -offset, width + offset * 2);
	separateDetective(-offset, -offset, width + offset * 2, graphics);
	image(graphics, 0, 0);
}

function separateDetective(x, y, d, g) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > 50) {
				separateDetective(i, j, w, g);
			} else {
				g.erase(255, 0);
				let str = random(100) > 50 ? "🕵️‍♀️" : "🕵️‍♂️";
				g.textSize(w * 0.95);
				g.textAlign(CENTER, CENTER);
				g.push();
				g.translate(i + w / 2, j + w / 2);
				g.scale(random(100) > 50 ? -1 : 1, random(100) > 50 ? -1 : 1);
				g.text(str, 0, 0);
				g.pop();
			}
		}
	}
}


function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 95 && d > 15) {
				separateGrid(i, j, w);
			} else {
				textSize(w);
				fill(0, 0, 90);
				textAlign(CENTER, CENTER);
				let s = str.substr(int(random(str.length)), 1);
				text(s, i + w / 2, j + w / 2 - w / 14);
			}
		}
	}
}