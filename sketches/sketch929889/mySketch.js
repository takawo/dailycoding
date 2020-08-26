let url = "https://coolors.co/app/ffcd38-f2816a-71dcdd-2d557f-f7ede2";
let palette = createPalette(url);
let particleSystems = [];
let num = 10;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	for (let i = 0; i < num; i++) {
		let particleSystem = new ParticleSystem(random(width), random(height), random(50, 100));
		particleSystems.push(particleSystem);
	}
	background(220, 80, 20);
}

function draw() {
	// blendMode(BLEND);
	// background(220, 80, 20,30);
	// blendMode(ADD);
	for (let particleSystem of particleSystems) {
		if (random(100) > 80) {
			particleSystem.moved();
		}
		particleSystem.update();
		particleSystem.checkEdges()
	}
	if (frameCount % 300 == 0) {
		particleSystems = [];
		for (let i = 0; i < num; i++) {
			let particleSystem = new ParticleSystem(random(width), random(height), random(50, 100));
			particleSystems.push(particleSystem);
		}
		background(220, 80, 20);

	}
}


class ParticleSystem {
	constructor(x, y, d) {
		this.particles = [];
		this.pool = [];
		this.MAX_PARTICLES = 10;
		this.maxSize = d;
		this.pos = createVector(x, y);
		this.ns = 800;
	}
	update() {
		let angle = noise(this.pos.x / this.ns, this.pos.y / this.ns, frameCount / this.ns) * 360;
		this.pos.add(p5.Vector.fromAngle(angle).mult(5));
		for (let i = this.particles.length - 1; i >= 0; i--) {
			let particle = this.particles[i];
			if (particle.alive) {
				particle.update();
				particle.display();
			} else {
				this.particles.splice(i, 1);
			}
		}
	}
	moved() {
		for (let i = 0; i < random(3); i++) {
			this.spawn(this.pos.x, this.pos.y);
		}
	}
	spawn(x, y) {
		let particle;
		// if (this.particles.length >= this.MAX_PARTICLES) {
		//   pool.push(particles.shift());
		// }
		particle = new Particle(x, y, random(this.maxSize / 2, this.maxSize), random(palette));
		this.particles.push(particle);
	}
	checkEdges() {
		if (this.pos.x > width) this.pos.x = 0;
		if (this.pos.x < 0) this.pos.x = width;
		if (this.pos.y > height) this.pos.y = 0;
		if (this.pos.y < 0) this.pos.y = height;
	}

}

class Particle {
	constructor(x, y, size, col) {
		this.c1 = col;
		this.sizeScaler = random(0.8, 0.95);
		this.alive = true;
		this.size = size || 10;
		this.maxSize = this.size;
		this.wander = random(0.5, 2);
		this.force = random(2, 3);
		this.angle = random(360);
		this.drag = random(0.95, 0.99);
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
		drawingContext.shadowColor = color(0, 0, 100, 20);
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