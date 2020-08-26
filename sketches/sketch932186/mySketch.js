let url = "https://coolors.co/0d3b66-faf0ca-f4d35e-ee964b-f95738";
// let url = "https://coolors.co/f6bd60-f7ede2-f5cac3-84a59d-f28482";
let palette;
let circlePackingSystems;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	init();
}

function init() {
	palette = createPalette(url);
	circlePackingSystems = [];
	shuffle(palette, true);
	for (let i = 0; i < palette.length; i++) {
		let circlePackingSystem = new CirclePackingSystem(palette[i]);
		circlePackingSystems.push(circlePackingSystem);
	}
}

function draw() {
	// for (let i = 0; i < num; i++) {
	//   let circlePackingSystem = circlePackingSystems[i]
	//   circlePackingSystem.update();
	//   circlePackingSystem.display();
	// }

	for (let circlePackingSystem of circlePackingSystems) {
		circlePackingSystem.update();
		circlePackingSystem.display();
	}

	if (frameCount % 1000 == 0) {
		init();
	}
}

class CirclePackingSystem {
	constructor(col) {
		this.graphics = createGraphics(width, height);
		this.graphics.colorMode(HSB, 360, 100, 100, 100);
		this.graphics.angleMode(DEGREES);
		this.graphics.background(col);
		this.color = color(col);
		this.circles = [];
	}
	update() {
		if (random(100) < 10) {
			let x = random(width);
			let y = random(height);
			let d = 0;
			let circle = new Circle(x, y, d, this.graphics);
			this.circles.push(circle);
		}
		for (let i = 0; i < this.circles.length; i++) {
			let circle = this.circles[i];
			circle.update();
			circle.display();
			circle.calcDistance(this.circles);
		}
	}
	display() {
		drawingContext.shadowColor = color(0, 0, 0);
		drawingContext.shadowBlur = 25;
		image(this.graphics, 0, 0);
	}
}

class Circle {
	constructor(x, y, d, g) {
		this.g = g;
		this.center = createVector(x, y);
		this.d = d;
		this.dStep = int(random(1, 4));
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
	display() {
		this.g.push();
		this.g.translate(this.center.x, this.center.y);
		this.g.erase();
		this.g.circle(0, 0, this.d);
		this.g.noErase();
		this.g.pop();
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