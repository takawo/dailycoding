// noprotect

let graphics;
let pallete_master = ["#50B6AD", "#CB1525", "#C9B942", "#F1E8A8", "#F05C9D", "#2D154D", "#180213", "#139FAC"];
let tf;
let bg;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	tf = new Transformer()

	let percent = 13 / 100;
	for (let i = 0; i < width * height * percent; i++) {
		let x = random(width);
		let y = random(height);
		let dw = random(3);
		let dh = random(3);
		graphics.fill(0, 0, 100, 8);
		graphics.noStroke();
		graphics.ellipse(x, y, dw, dh);
	}
}

function draw() {
	let pallete = pallete_master.concat();
	let bgNum = int(random(pallete.length));
	background(pallete[bgNum]);
	pallete.splice(bgNum, 1);

	let cells = int(random(3, 15));
	let offset = width / 10;
	let margin = 0; //offset / 5;
	let w = sqrt(sq(width) + sq(height));
	let cellSize = (w + offset * 2 - margin * (cells - 1)) / cells;

	tf.push();
	tf.translate(width / 2, height / 2);
	tf.rotate(int(random(4)) * 360 / 4 + 360 / 8);
	for (let j = 0; j < cells; j++) {
		for (let i = 0; i < cells; i++) {
			let cx = -w / 2 - offset + i * (cellSize + margin) + cellSize / 2;
			let cy = -w / 2 - offset + j * (cellSize + margin) + cellSize / 2;
			let num = max(int(random(3) * 3), 2);
			if (random(100) < 30) {
				drawLineTriangle(cx, cy, cellSize / 2, num, pallete.concat());
			} else {
				drawLineArc(cx, cy, cellSize / 2, num, pallete.concat());
			}
		}
	}
	tf.pop();
	image(graphics, 0, 0);
	//frameRate(.5);
	noLoop();
}

function drawLineArc(x, y, d, num, pallete_copy) {
	tf.push();
	tf.translate(x, y);
	for (let i = 0; i < num; i++) {
		let colors = pallete_copy.concat();
		let n = int(noise(tf.x / width, tf.y / height) * colors.length);
		let fcNum = int(random(colors.length));
		let fc = colors[n];
		colors.splice(n, 1);
		tf.push();
		tf.rotate(int(random(4)) * 360 / 4);
		let sc1 = random(colors);
		let sc2 = random(colors);
		while (sc1 == sc2) {
			sc2 = random(colors);
		}

		for (let dd = d * 2 * 2; dd >= 0; dd -= d * 2 / 3) {
			if (dd == d * 2 * 2) {
				fill(fc);
				noStroke();
				arc(-d, -d, dd, dd, 0, 90);
			} else {
				noFill();
			}
			tf.push();
			tf.translate(-d, -d);
			for (let angle = 0; angle < 90; angle += 1) {
				let x1 = cos(angle) * dd / 2;
				let y1 = sin(angle) * dd / 2;
				let x2 = cos(angle + 1) * dd / 2;
				let y2 = sin(angle + 1) * dd / 2;
				colorMode(RGB);
				let sc = lerpColor(color(sc1), color(sc2), angle / 90);
				stroke(sc);
				strokeWeight(d / 50);
				line(x1, y1, x2, y2);
				colorMode(HSB);
			}
			tf.pop();
		}
		tf.pop();
	}
	tf.pop();
}


function drawLineTriangle(x, y, d, num, pallete_copy) {
	let rotateArr = [0, 90, 180, 360];
	let rotateArrCopy = rotateArr.concat();
	tf.push();
	tf.translate(x, y);
	for (let i = 0; i < num; i++) {
		let colors = pallete_copy.concat();
		let n = int(noise(tf.x / width, tf.y / height) * colors.length);
		let fcNum = int(random(colors.length));
		let fc = colors[n];
		colors.splice(n, 1);
		tf.push();
		tf.rotate(int(random(4)) * 360 / 4);
		let sc1 = random(colors);
		let sc2 = random(colors);
		while (sc1 == sc2) {
			sc2 = random(colors);
		}
		for (let dd = 0; dd <= d; dd += d / 3) {
			if (dd == 0) {
				fill(fc);
				noStroke();
				triangle(0, 0 - dd, -d + dd, -d, d - dd, -d);
			} else {
				noFill();
			}
			stroke(0);
			let p0 = createVector(0, 0 - dd);
			let p1 = createVector(-d + dd, -d);
			let p2 = createVector(d - dd, -d);
			for (let m = 0; m < 1; m += 1 / 100) {
				colorMode(RGB);
				let sc = lerpColor(color(sc1), color(sc2), m / 1);
				strokeWeight(d / 50);
				stroke(sc);
				let pA = p5.Vector.lerp(p0, p1, m);
				let pB = p5.Vector.lerp(p0, p1, m + 1 / 100);
				line(pA.x, pA.y, pB.x, pB.y);
				let pC = p5.Vector.lerp(p0, p2, m);
				let pD = p5.Vector.lerp(p0, p2, m + 1 / 100);
				line(pC.x, pC.y, pD.x, pD.y);
				colorMode(HSB);
			}
		}
		tf.pop();
	}
	tf.pop();
}