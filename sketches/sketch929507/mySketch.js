//reference (original): particles example sketch.js by Justin Windle
//https://github.com/soulwire/sketch.js

//reference (ported) : Wandering Particles by André Casey
//https://www.openprocessing.org/sketch/446535

let particles = [];
let pool = [];
let MAX_PARTICLES = 150;

let url = "https://coolors.co/app/ffcd38-f2816a-71dcdd-2d557f-f7ede2";
let palette = createPalette(url);

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
}

function draw() {
	blendMode(BLEND);
	background(220, 80, 20);
	blendMode(ADD);
	for (let i = particles.length - 1; i >= 0; i--) {
		let particle = particles[i];
		if (particle.alive) {
			particle.update();
			particle.display();
		} else {
			pool.push(particles.splice(i, 1)[0]);
		}
	}
}

function moved() {
	let max = random(1, 4);
	for (let i = 0; i < max; i++) {
		spawn(mouseX, mouseY);
	}
}

function spawn(x, y) {
	var particle, theta, force;
	if (particles.length >= MAX_PARTICLES) {
		pool.push(particles.shift());
	}
	particle = new Particle(mouseX, mouseY, random(10, 100), random(palette));
	particles.push(particle);
}

function mouseMoved() {
	moved();
}

function touchMoved() {
	moved();
}

class Particle {
	constructor(x, y, size, col) {
		this.c1 = col;
		this.sizeScaler = 0.97;
		this.alive = true;
		this.size = size || 10;
		this.maxSize = this.size;
		this.wander = random(0.5, 2);
		this.force = random(2, 4);
		this.angle = random(360);
		this.drag = random(0.9, 0.95);
		this.pos = createVector(x, y);

		this.vel = createVector(cos(this.angle) * this.force, sin(this.angle) * this.force);
	}
	update() {
		this.pos.add(this.vel);
		this.vel.mult(this.drag);
		this.angle += random(this.angleStep1, this.angleStep2) * this.wander;
		this.vel.x += cos(this.angle) * 0.1;
		this.vel.y += sin(this.angle) * 0.1;
		this.size *= this.sizeScaler;
		this.alive = this.size > 0.5;
	}
	display() {
		this.color = color(this.c1 + hex(map(this.size, 0, this.maxSize, 0, 100), 2));
		fill(this.color);
		noStroke();
		drawingContext.shadowColor = color(0, 0, 100);
		drawingContext.shadowBlur = this.size;
		ellipse(this.pos.x, this.pos.y, this.size, this.size);
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