let pallete = ["#50B6AD", "#CB1525", "#C9B942", "#F1E8A8", "#F05C9D", "#2D154D", "#180213", "#139FAC"];
let texture;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	texture = createGraphics(width, height);
	texture.colorMode(HSB, 360, 100, 100, 100);
	texture.angleMode(DEGREES);
	texture.fill(0, 0, 100, 3);
	texture.noStroke();

	for (let i = 0; i < width * height * 10 / 100; i++) {
		let x = random(width);
		let y = random(height);
		let angle = random(360);
		texture.push();
		texture.translate(x, y);
		texture.rotate(angle);
		texture.ellipse(0, 0, random(3), random(3));
		texture.pop();
	}
}

function draw() {
	background(0, 0, 95);
	separateGrid(0, 0, width);
	blendMode(ADD);
	image(texture, 0, 0);
	noLoop();
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 3) {
				separateGrid(i, j, w);
			} else {
				noStroke();
				fill(random(pallete));
				rect(i, j, w, w);
				push();
				translate(i + w / 2, j + w / 2);
				rotate(int(random(4)) * 360 / 4);
				scale(random(100) > 50 ? -1 : 1,
					random(100) > 50 ? -1 : 1);
				translate(-w / 2, -w / 2);
				let vectors = setVectors(0, 0, w, w);
				let sep = 10;
				map(sq(w), sq(width), 0, 100, 1);
				let gGap = 1 / sep;
				let prev_col = -1;
				let col = prev_col;
				for (let k = 0; k < sep; k++) {
					let dir = random(100) > 50 ? -1 : 1;
					while (prev_col == col) {
						col = random(pallete);
					}
					prev_col = col;
					drawingContext.shadowBlur = w / 15;
					drawingContext.shadowColor = color(col + hex(150, 2));
					vectors = getShiftedVectorArray(vectors, gGap, dir);
					drawSquare(vectors, col);
				}
				pop();
			}
		}
	}

}

function setVectors(x, y, w, h) {
	let vectors = [];
	vectors.push(createVector(x, y));
	vectors.push(createVector(x + w, y));
	vectors.push(createVector(x + w, y + h));
	vectors.push(createVector(x, y + h));
	return vectors;
}

function getShiftedVectorArray(vectors, gap, dir) {

	let nextVectorArray = [];

	for (let i = 0; i < vectors.length; i++) {
		let directionVector = p5.Vector.sub(vectors[(i + 1) % 4], vectors[i]);
		directionVector.mult(gap);
		nextVectorArray.push(p5.Vector.add(vectors[i], directionVector));
	}

	return nextVectorArray;
}

function drawSquare(vectors, col) {
	noStroke();
	fill(col);
	beginShape();
	for (let i = 0; i < vectors.length; i++) {
		vertex(vectors[i].x,
			vectors[i].y);
	}
	endShape(CLOSE);
}