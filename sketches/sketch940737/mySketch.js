//reference: Mat Reding .@matreding ' s awesome image.
//https://unsplash.com/photos/XDzXzjbxld0

let round, offset;
let graphics;
let img;

function preload() {
	img = loadImage("mat-reding-XDzXzjbxld0-_a.jpg");
}


function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
	background(0, 0, 80);

	graphics.clear();

	offset = width / 40;
	round = 6;

	separateGrid(offset, offset, width - offset * 2);

	let x = offset;
	let y = offset;
	let w = width - offset * 2;
	let h = height - offset * 2;
	drawingContext.shadowColor = color(0, 0, 0, 50);
	drawingContext.shadowBlur = offset / 5;
	drawingContext.shadowOffsetY = offset / 10;
	image(graphics, 0, 0);
	frameRate(1);
	// noLoop();
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 5));
	let w = d / sepNum;
	let ratio = 1 / 20;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && w > width / 3) {
				separateGrid(i, j, w);
			} else {
				// rect(i, j, w, w);
				drawingBrowser(i + w * ratio, j + w * ratio, w * (1 - ratio * 2), w * (1 - ratio * 2), graphics);

			}
		}
	}
}

function drawingBrowser(x, y, w, h, g) {
	g.push();
	g.translate(x, y);
	g.fill(0, 0, 100);
	g.noStroke();
	g.rect(0, 0, w, h, round);
	g.fill(0, 0, 90);
	g.rect(0, 0, w, 40, round, round, 0, 0);


	g.fill(0, 0, 100);
	g.stroke(0, 0, 0, 10);
	g.rect(w - 20, 40, 20, h - 40, 0, 0, round, 0);
	g.rect(0, h - 20, w, 20, 0, 0, round, round);


	let pw = w - 20;
	let ph = h - 60;
	let px = random(img.width - pw);
	let py = random(img.height - ph);



	let img_trim = img.get(px, py, pw, ph);
	g.image(img_trim, 0, 40, w - 20, h - 60);


	let ry = random(50, h - 50);
	let rh = constrain(random(20, h - ry - 50), 0, h);
	let rx = random(0, w - 50);
	let rw = random(20, w - rx - 50);

	g.fill(0, 0, 85);
	g.stroke(0, 0, 75);
	g.rect(w - 16, ry, 12, rh, 5);


	g.fill(0, 0, 85);
	g.stroke(0, 0, 75);
	g.rect(rx, h - 16, rw, 12, 5);




	g.push();
	g.translate(0, 0);

	g.stroke(0, 100, 100);
	g.fill(0, 80, 100);
	g.ellipse(20, 20, 12, 12);

	g.stroke(45, 100, 100);
	g.fill(45, 80, 100);
	g.ellipse(40, 20, 12, 12);

	g.stroke(100, 100, 100);
	g.fill(100, 80, 80);
	g.ellipse(60, 20, 12, 12);
	g.pop();

	g.pop();
}