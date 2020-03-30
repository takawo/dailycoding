let cells, offset, margin, cellSize;
let graphics;
let img;
let pallete;
let url = "https://coolors.co/app/114b5f-028090-e4fde1-456990-f45b69";
let w, rs;

function setup() {
	createCanvas(800, 800, WEBGL);
	angleMode(DEGREES);
	colorMode(HSB, 360, 100, 100, 100);
	ortho(-width / 2, width / 2, height / 2, -height / 2, -1600, 1600);
	cells = int(random(4, 8));
	offset = width / 10;
	margin = offset / 5;
	cellSize = (width - offset * 2 - margin * (cells - 1)) / cells;

	pallete = createPallete(url);
	rs = random(1000);
	w = sqrt(sq(width) + sq(height));

	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);

	for (let i = 0; i < 50000; i++) {
		graphics.stroke(0, 0, 100, 17);
		graphics.point(random(width), random(height));
	}
	img = createImage(width, height);
	img.copy(graphics, 0, 0, graphics.width, graphics.height, 0, 0, graphics.width, graphics.height);

}

function draw() {
	background(0, 0, 10);
	orbitControl();
	randomSeed(rs);

	for (let j = 0; j < cells; j++) {
		for (let i = 0; i < cells; i++) {
			let x = -width / 2 + offset + i * (cellSize + margin) + cellSize / 2;
			let y = -height / 2 + offset + j * (cellSize + margin) + cellSize / 2;


			let sep = int(random(5, 12));
			let maxLength = cellSize * 1.4;
			for (let i = 0; i < sep; i++) {
				let w = random();
				let h = random();
				let d = random();
				let sum = w + h + d;
				w = w / sum * maxLength;
				h = h / sum * maxLength;
				d = d / sum * maxLength;
				drawBoxByPlane(x, y, i * 100, w * (sep - i) / sep, h * (sep - i) / sep, d * (sep - i) / sep, pallete.concat());
			}
		}
	}

	push();
	translate(0, 0, 1000);
	noStroke();
	texture(img);
	plane(width, height);
	pop();







}

function drawBoxByPlane(x, y, z, w, h, d, colors) {
	push();
	translate(x, y, z);
	rotateX(int(random(8)) * 360 / 8);
	rotateY(int(random(8)) * 360 / 8);
	rotateZ(int(random(8)) * 360 / 8);

	noStroke();
	push();
	translate(0, 0, -d / 2);
	fill(random(colors));
	plane(w, h);
	pop();

	push();
	translate(0, 0, d / 2);
	fill(random(colors));
	plane(w, h);
	pop();


	push();
	translate(-w / 2, 0, 0);
	rotateY(90);
	rotateZ(90);
	fill(random(colors));
	plane(h, d);
	pop();

	push();
	translate(w / 2, 0, 0);
	rotateY(90);
	rotateZ(90);
	fill(random(colors));
	plane(h, d);
	pop();

	push();
	translate(0, -h / 2, 0);
	rotateX(90);
	fill(random(colors));
	plane(w, d);
	pop();

	push();
	translate(0, h / 2, 0);
	rotateX(90);
	fill(random(colors));
	plane(w, d);
	pop();

	pop();
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