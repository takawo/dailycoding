//reference : wks / @wks_jp' s awesome erase sketch!
//https://www.openprocessing.org/sketch/932865

let url = "https://coolors.co/03045e-023e8a-0077b6-0096c7-00b4d8-48cae4-90e0ef-ade8f4-caf0f8";
// let url = "https://coolors.co/f6bd60-f7ede2-f5cac3-84a59d-f28482";
let palette;
let offset;
let circles;
let graphices;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	init();
}

function init() {
	offset = width / 10;
	palette = shuffle(createPalette(url), true);

	circles = [];
	graphices = [];

	for (let i = 0; i < palette.length - 1; i++) {
		let g = createGraphics(width, height);
		if (i == palette.length - 2) {
			g.background(palette[i]);
		} else {
			separateGrid(0, 0, width, g);

		}
		graphices.push(g);
	}
	addCircle();
}

function draw() {
	background(palette[palette.length - 1]);
	for (let circle of circles) {
		circle.update();
		circle.display();
		circle.calcDistance(circles);
		circle.checkEdge({
			x: -offset,
			y: -offset,
			w: width + offset * 2,
			h: height + offset * 2
		})

	}
	let i = 0;
	for (let graphic of graphices) {
		drawingContext.shadowColor = color(0, 0, 0, 33);
		// drawingContext.shadowOffsetX = 15 / 2;
		// drawingContext.shadowOffsetY = 15 / 2;
		drawingContext.shadowBlur = 15;
		image(graphic, 0, 0);
		i++;
	}
	if (frameCount % 5 == 0) {
		addCircle();
	}
	if (frameCount % 500 == 0) {
		init();
	}
}

function separateGrid(x, y, d, g) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 15) {
				separateGrid(i, j, w, g);
			} else {
				g.fill(random(palette));
				g.noStroke();
				g.rect(i, j, w, w);
			}
		}
	}
}

function addCircle() {
	let isNear = true;
	let circle;
	while (isNear) {
		let x = random(-offset, width + offset);
		let y = random(-offset, height + offset);
		let bool;
		circle = new Circle(x, y, graphices);
		for (let circle of circles) {
			bool = circle.calcDistance2(createVector(x, y));
			if (bool) return;
		}
		isNear = false;
	}
	circles.push(circle);
}


class Circle {
	constructor(x, y, graphices) {
		this.center = createVector(x, y);
		this.d = 0;
		this.graphices = graphices;
		this.dStep = int(random(1, 8));

		this.alive = true;
	}
	update() {
		if (this.alive) {
			this.d += this.dStep;
		}
	}
	calcDistance(circles) {
		for (let circle of circles) {
			if (this.center.equals(circle.center) == false) {
				let distance = p5.Vector.dist(this.center, circle.center);
				if (distance < this.d / 2 + circle.d / 2 + 10) {
					this.alive = false;
					circle.alive = false;
				}
			}
		}
	}
	checkEdge(bound) {
		if (this.center.x - this.d / 2 < bound.x ||
			this.center.x + this.d / 2 > bound.x + bound.w ||
			this.center.y - this.d / 2 < bound.y ||
			this.center.y + this.d / 2 > bound.y + bound.h) {
			this.alive = false;
		}

	}
	calcDistance2(point) {
		let distance = p5.Vector.dist(this.center, point);
		return distance < this.d / 2
	}
	display() {
		let i = 1;
		for (let graphic of graphices) {
			graphic.push();
			graphic.translate(this.center.x, this.center.y);
			graphic.erase();
			graphic.circle(0, 0, this.d * i / graphices.length);
			graphic.noErase();
			graphic.pop();
			i++;
		}
	}
}

function createPalette(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');
	for (let i = 0; i < arr.length; i++) {
		arr[i] = '#' + arr[i];
	}
	return arr;
}