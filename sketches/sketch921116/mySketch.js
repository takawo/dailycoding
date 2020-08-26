let sounds = [];
let n = 0;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	cursor(HAND);

	blendMode(BLEND);
	background(0, 0, 0);

	frameRate(30);
}

function draw() {
	blendMode(BLEND);
	background(0, 0, 0);
	blendMode(ADD);

	let removeArr = [];
	for (let sound of sounds) {
		sound.update();
		sound.display();
	}
	for (let i = sounds.length - 1; i >= 0; i--) {
		if (sounds[i].isDead()) {
			sounds.splice(i, 1);
		}
	}

}

function mousePressed() {
	let num = int(random(1, 4));
	for (let i = 0; i < num; i++) {
		let sound = new MySound(mouseX, mouseY);
		sounds.push(sound);
		n++;
	}
}

class MySound {
	constructor(x, y) {
		this.music_scales = [261, 293, 329, 349, 391, 440, 493];
		this.octaves = [0.25, 0.5, 1];
		this.wave_types = ['sine', 'triangle', 'sawtooth', 'square']
		this.id = n;
		this.pos = createVector(x, y);

		let wave_type = random(this.wave_types);
		let octave = random(this.octaves);
		let music_scale = this.music_scales[sounds.length * 3 % sounds.length];
		this.osc = new p5.Oscillator(music_scale * octave, wave_type);
		this.reverb = new p5.Reverb();
		this.reverb.process(this.osc, random(2, 4), random(2));
		this.osc.amp(0, 0);
		this.osc.start();
		this.osc.amp(0.05, random(0.1, 0.5));
		this.osc.amp(0, random(2, 5));
		this.amplitude = new p5.Amplitude();
		this.amplitude.setInput(this.reverb);
		this.level = 1;
		this.hue = random(360);
		this.size = random(20, 50) * 2;
		this.life = 0;
	}
	update() {
		this.level = this.amplitude.getLevel();
		this.life++;
	}
	display() {
		noFill();
		stroke((this.hue + frameCount) % 360, 100, 100, (120 - this.life) / 120 * 100);
		strokeWeight(10);
		drawingContext.shadowColor = color(this.hue, 100, 100);
		drawingContext.shadowBlur = 10 * 2;
		ellipse(this.pos.x, this.pos.y, this.level * width * this.size);
	}
	isDead() {
		return this.level < 0.001 && this.life > 100;
	}
}