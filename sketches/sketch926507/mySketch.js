let rectangle;
let rectangles;
// let palette = ["#EDF7F5", "#B7D7D8", "#FF8984", "#204E5F", "#FFC6A8"];
let palette = ["#10111C", "#23AECC", "#ECE1B4", "#CC3016", "#F2C96E", "#178FA6"];

let isRecording = false;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	// startRecording();  
	rectangles = [];
	let offset = width / 20;
	separateGrid(offset, offset, width - offset * 2);
}

function draw() {
	background(0, 0, 95);
	for (let rectangle of rectangles) {
		rectangle.display();
	}

	if (frameCount % 100 == 0) {
		rectangles = [];
		let offset = width / 20;
		separateGrid(offset, offset, width - offset * 2);

	}
}

// function mousePressed() {
// 	if (isRecording == true) {
// 		stopRecording();
// 	} else {
// 		startRecording();
// 	}
// 	isRecording = !isRecording;
// }

class Rectangle {
	constructor(b, c) {
		this.b = b;
		this.ratio = random(1, 3) / 3;
		this.rs = random(1000);
		this.colors = shuffle(c);
	}
	display() {
		randomSeed(this.rs);
		push();
		translate(this.b.cx, this.b.cy);
		rotate(this.b.a);
		rectMode(CENTER);
		let i = int(this.rs);
		for (let d = this.b.w * 0.9 - this.b.w / 30; d > this.b.w / 11; d -= this.b.w / 7) {

			drawingContext.setLineDash([d * .66, d * 0.33]);
			drawingContext.lineDashOffset = this.ratio * frameCount % (d * 4) * (i % 2 == 0 ? -1 : 1);
			drawingContext.shadowColor = color(0, 0, 0, 15);
			drawingContext.shadowBlur = this.b.w / 10;
			drawingContext.shadowOffsetX = this.b.w / 10;
			drawingContext.shadowOffsetY = this.b.w / 10;
			strokeWeight(this.b.w / 30);
			stroke(this.colors[i % this.colors.length]);
			// strokeCap(SQUARE);
			rect(0, 0, d,d, d / 4);
			i++;
		}
		pop();
		noFill();
	}
}

class Bound {
	constructor(cx, cy, w, a) {
		this.cx = cx;
		this.cy = cy;
		this.w = w;
		this.a = a;
	}
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && w > width / 4) {
				separateGrid(i, j, w);
			} else {
				let bound = new Bound(i + w / 2, j + w / 2, w, int(random(4)) * 360 / 4);
				let rectangle = new Rectangle(bound, palette.concat());
				rectangles.push(rectangle);
			}
		}
	}
}