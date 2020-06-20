//reference: nature of code
//https://github.com/nature-of-code/noc-examples-p5.js/tree/master/chp03_oscillation/NOC_3_11_spring

let bob;
let spring;
let springSystems;
let rows, offset, margin, rowSize;
let pallete = ["#4D6F83", "#B1B0B1", "#278DD3", "#F8B623", "#3C494F", "#D51311", "#02020C"];

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	init();
}

function init() {
	springSystems = [];
	rows = int(random(5, 15));
	offset = width / 10;
	margin = offset / 2;
	rowSize = (height + offset * 2 - margin * (rows - 1)) / rows;

	for (let i = 0; i < rows; i++) {
		let y = -offset + i * (rowSize + margin);
		let xPlus = 0;
		if (i % 2 == 0) xPlus = rowSize / 2;
		for (let x = -offset + xPlus; x < width + offset + xPlus; x += rowSize * 2) {
			let angle = map(sin((x + y * width) / 5), -1, 1, 0, 180);
			let sp = new SpringSystem(x, y, rowSize, rowSize, angle);
			springSystems.push(sp);
		}
	}
}

function draw() {
	background(0, 0, 95);
	for (let sp of springSystems) {
		sp.run();
	}
	if (frameCount % 250 == 0) {
		init();
	}
}

class SpringSystem {
	constructor(x, y, w, h, angle) {
		let c1 = random(pallete);
		let c2 = random(pallete);
		while (c1 == c2) c2 = random(pallete);
		this.spring = new Spring(x + w / 2, y, min(w, h), c1);
		let xx = x + w / 2 + cos(angle) * min(w, h) / 2;
		let yy = y + sin(angle) * min(w, h) / 2;
		this.bob = new Bob(xx, yy, c2);
		this.minLength = min(w, h) * 1.5;
	}
	run() {
		let gravity = createVector(0, 2);
		this.bob.applyForce(gravity);
		this.spring.connect(this.bob);
		this.spring.constrainLength(this.bob, 30, 400);

		this.bob.update();
		this.spring.displayLine(this.bob);
		this.bob.display();
		this.spring.display();
	}
}

class Bob {
	constructor(x, y, c) {
		this.position = createVector(x, y);
		this.velocity = createVector();
		this.acceleration = createVector();
		this.mass = random(4,16);
		this.damping = 0.98;
		this.dragOffset = createVector();
		this.dragging = false;
		this.col = c;
	}
	update() {
		this.velocity.add(this.acceleration);
		this.velocity.mult(this.damping);
		this.position.add(this.velocity);
		this.acceleration.mult(0);
	}
	display() {
		noStroke();
		fill(this.col);
		if (this.dragging) {
			fill(0, 0, 80);
		}
		drawingContext.shadowColor =color(0,0,0,50);
		drawingContext.shadowBlur = this.mass;
		drawingContext.shadowOffsetY = this.mass/2;
		circle(this.position.x, this.position.y, this.mass * 2);
	}
	applyForce(force) {
		let f = force.copy();
		f.div(this.mass);
		this.acceleration.add(f);
	}
}


class Spring {
	constructor(x, y, length, c) {
		this.anchor = createVector(x, y);
		this.restLength = length;
		this.k = 0.2;
		this.col = c;

	}
	connect(bob) {
		let force = p5.Vector.sub(bob.position, this.anchor);
		let d = force.mag();
		let stretch = d - this.restLength;

		force.normalize();
		force.mult(-1 * this.k * stretch);
		bob.applyForce(force);
	}
	constrainLength(b, minLength, maxLength) {
		let dir = p5.Vector.sub(b.position, this.anchor);
		let d = dir.mag();
		if (d < minLength) {
			dir.normalize();
			dir.mult(minLength);
			b.position = p5.Vector.add(this.anchor, dir);
			b.velocity.mult(0);
		} else if (d > maxLength) {
			dir.normalize();
			dir.mult(maxLength);
			b.position = p5.Vector.add(this.anchor, dir);
			b.velocity.mult(0);
		}
	}
	display() {
		noStroke();
		fill(this.col);
		ellipse(this.anchor.x, this.anchor.y, 10);
	}
	displayLine(b) {
		strokeWeight(2);
		stroke(this.col);
		line(b.position.x, b.position.y, this.anchor.x, this.anchor.y);
	}
}