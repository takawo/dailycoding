let maskGraphics;
let backgroundGraphics;
let textureGraphics;
let cells, offset, margin, cellSize;
let pallet;
let url = ["https://coolors.co/app/fe938c-e6b89c-ead2ac-9cafb7-4281a4",
	"https://coolors.co/app/7bdff2-b2f7ef-eff7f6-f7d6e0-f2b5d4",
	"https://coolors.co/9c89b8-f0a6ca-efc3e6-f0e6ef-b8bedd",
	"https://coolors.co/app/ffcdb2-ffb4a2-e5989b-b5838d-6d6875",
	"https://coolors.co/app/f2d7ee-d3bcc0-a5668b-69306d-0e103d"
];

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	maskGraphics = createGraphics(width, height);
	maskGraphics.colorMode(HSB, 360, 100, 100, 100);
	maskGraphics.background(0, 0, 100);
	maskGraphics.angleMode(DEGREES);


	backgroundGraphics = createGraphics(width, height);
	backgroundGraphics.colorMode(HSB, 360, 100, 100, 100);
	backgroundGraphics.angleMode(DEGREES);

	init();

	textureGraphics = createGraphics(width, height);
	textureGraphics.colorMode(HSB, 360, 100, 100, 100);
	textureGraphics.noStroke();
	textureGraphics.fill(0, 0, 100, 10);

	for (let i = 0; i < width * height * 10 / 100; i++) {
		let x = random(width);
		let y = random(height);
		let w = random(3);
		let h = random(3);
		textureGraphics.ellipse(x, y, w, h);
	}
}

function init() {

	cells = int(random(2, 8));
	offset = width / 10;
	margin = 0;
	max(offset / 5, 20);
	cellSize = (width - offset * 2 - margin * (cells - 1)) / cells;

	maskGraphics.background(0, 0, 10);
	backgroundGraphics.clear();
	let c1 = -1;
	let c2 = -1;
	for (let j = 0; j < cells; j++) {
		for (let i = 0; i < cells; i++) {
			let d = cellSize;
			let x = offset + i * (d + margin);
			let y = offset + j * (d + margin);
			let cx = x + d / 2;
			let cy = y + d / 2;

			pallete = createPallete(random(url));

			maskGraphics.erase(255, 0);
			//maskGraphics.ellipse(cx, cy, d - 2, d - 2);
			let points = [];
			let n = 0;
			let num = 8;
			let angleStep = 360 / num;
			maskGraphics.beginShape();
			for (let angle = 0; angle < 360; angle += angleStep) {
				let r = noise(random(1000), angle / 100, frameCount / 300) * d / 1.5;
				let xxx = cx + cos(angle) * r;
				let yyy = cy + sin(angle) * r;
				if (n < 3) {
					points.push(createVector(xxx, yyy));
				}
				maskGraphics.curveVertex(xxx, yyy);
				n++;
			}
			for (let p of points) {
				maskGraphics.curveVertex(p.x, p.y);
			}
			maskGraphics.endShape();


			backgroundGraphics.push();
			backgroundGraphics.translate(cx, cy);
			//backgroundGraphics.rotate(int(random(4)) * 360 / 4);
			backgroundGraphics.rotate(random(360));
			backgroundGraphics.translate(-d / 2, -d / 2);
			backgroundGraphics.noStroke();

			let sep = int(random(3, 10));
			for (let yy = -d; yy < d * 2; yy += d / sep) {
				let ns1 = random(50, 300);
				let ns2 = random(50, 300);
				c1 = random(pallete);
				while (c1 == c2) {
					c1 = random(pallete);
				}
				c2 = c1;

				backgroundGraphics.fill(c1);
				backgroundGraphics.beginShape();
				for (let xx = 0; xx < d; xx += 3) {
					let yyy = constrain(yy + noise(xx / ns1, yy / ns2) * d, 0, d)
					backgroundGraphics.vertex(xx, yyy);
					// if (random(100) < 10) {
					//   ns1 = random(50, 150);
					//   ns2 = random(50, 150);
					// }
				}
				backgroundGraphics.vertex(d, d);
				backgroundGraphics.vertex(0, d);
				backgroundGraphics.endShape(CLOSE);

			}
			backgroundGraphics.pop();
		}
	}

}

function draw() {
	background(0);

	image(backgroundGraphics, 0, 0);
	image(maskGraphics, 0, 0);
	image(textureGraphics, 0, 0);

	if (frameCount % 120 == 0) {
		//save();
		init();
	}
}


function createPallete(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');
	for (let i = 0; i < arr.length; i++) {
		arr[i] = '#' + arr[i];
	}
	return arr;
}