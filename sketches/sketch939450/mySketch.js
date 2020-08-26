//reference : @junkiyoshi's awesome Flower blanket. Draw by openFrameworks!
// https://junkiyoshi.com/openframeworks20200719/

let flowers = [];
let offset;
let url = "https://coolors.co/e63946-f1faee-a8dadc-457b9d-1d3557";
let palette;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	palette = createPalette(url);

	offset = width / 10;

	while (flowers.length < 10) {
		let pos = createVector(random(offset, width - offset),
			random(offset, height - offset));
		let radius = random(65,120);
		let isFar = true;
		for (let f of flowers) {
			let distance = p5.Vector.dist(f.pos, pos);
			if (distance < f.radius + radius) {
				isFar = false;
				break;
			}
		}
		if (isFar) {
			flowers.push(new Flower(pos, radius*1.3, shuffle(palette)));
		}
	}
	while (flowers.length < 20) {
		let pos = createVector(random(offset, width - offset),
			random(offset, height - offset));
		let radius = random(10, 40);
		let isFar = true;
		for (let f of flowers) {
			let distance = p5.Vector.dist(f.pos, pos);
			if (distance < f.radius + radius) {
				isFar = false;
				break;
			}
		}
		if (isFar) {
			flowers.push(new Flower(pos, radius * 1.5, palette));
		}
	}
	background(0, 0, 90);
}

function draw() {
	blendMode(BLEND);
	background(0, 0, 10);
	blendMode(ADD);
	for (let f of flowers) {
		f.display();
	}
}

class Flower {
	constructor(pos, radius, palette) {
		this.pos = createVector(pos.x, pos.y);
		this.radius = radius;
		this.color_list = palette;
		this.noise_seed_deg = random(1000);
		this.noise_seed_radius = random(1000);
		this.frame_param = random(1000);
		this.g = createGraphics(this.radius * 2, this.radius * 2);
		this.g.angleMode(DEGREES);
		this.fan_num = int(random(3, 10));
	}
	update() {

	}
	display() {
		this.g.clear();
		this.g.push();
		// this.g.rect(1, 1, this.g.width - 2, this.g.height - 2);
		this.g.translate(this.g.width / 2, this.g.height / 2);

		for (let k = 0; k < this.color_list.length; k++) {

			this.g.fill(this.color_list[k]);
			this.g.noStroke();

			this.g.beginShape();
			for (let m = 0; m < 20; m++) {

				let angle = map(noise(k * 33, this.noise_seed_deg, (this.frame_param + frameCount + m) * 0.005), 0, 1, -360 * 2, 360 * 2);
				let noise_radius = map(noise(k * 67, this.noise_seed_radius, (this.frame_param + frameCount + m) * 0.01),
					0, 1, this.radius * -1, this.radius * 1);
				this.g.vertex(noise_radius * cos(angle), noise_radius * sin(angle));
			}
			this.g.endShape();
		}

		this.g.pop();

		push();
		translate(this.pos.x, this.pos.y);
		// drawingContext.shadowColor = color(0,0,100);
		// drawingContext.shadowBlur = this.g.width/2;
		imageMode(CENTER);
		for (let i = 0; i < this.fan_num; i++) {
			rotate(360 / this.fan_num);
			image(this.g, 0, 0);
		}
		pop();

	}
}

function createPalette(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');
	for (let i = 0; i < arr.length; i++) {
		arr[i] = color('#' + arr[i]+hex(100,2));
	}
	return arr;
}