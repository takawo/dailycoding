let cells, offset, margin, d;
let bg;
let pallete = ["#4A5560", "#FCF6F6", "#7A0C10", "#FE2112", "#8A8A9B", "#03090D"];

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	blendMode(ADD);
	background(0, 0, 10);

	strokeCap(SQUARE);
	bg = createGraphics(width, height);
	bg.colorMode(HSB, 360, 100, 100, 100);
	let percent = 10 / 100;
	for (let i = 0; i < width * height * percent; i++) {
		bg.stroke(0, 0, 20, 10);
		bg.point(random(bg.width), random(bg.height));
	}
	let w = sqrt(sq(width) + sq(height));
	push();
	translate(width / 2, height / 2);
	rotate(int(random(4)) * 360 / 4 + 45);
	separateGrid(-w / 2, -w / 2, w);
	pop();
	image(bg, 0, 0);
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 5) {
				separateGrid(i, j, w);
			} else {
				drawArcLines(i, j, w);
			}
		}
	}
}

function drawArcLines(x, y, d) {
	push();
	translate(x + d / 2, y + d / 2);
	rotate(int(random(4)) * 360 / 4);
	noStroke();
	push();
	translate(-d / 2, -d / 2);
	let angleStep = int(random(10, 5)) / 100 * 90;
	let sep = int(random(10, 35));
	for (let r = d; r > 0; r -= d / sep) {

		stroke(0, 0, 15);
		noFill();
		let n = int(random(2));
		for (let angle = 0; angle < 90; angle += angleStep) {
			stroke(random(pallete));
			strokeWeight(1);
			beginShape();
			let a = angle;
			let e = min(angle + angleStep, 90);
			if (n % 2 == 0) {
				while (a < e) {
					vertex(cos(a) * (r - 1 / 2), sin(a) * (r - 1 / 2));
					a += 1;
				}
			}
			n++;
			endShape();
		}
	}
	pop();
	pop();

}