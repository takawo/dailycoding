let sounds = [];

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
}

function draw() {
	background(220, 80, 20);
	let remove_arr = [];

	for (let sound of sounds) {
		sound.run();
		if (sound.lifeCount < 0) {
			remove_arr.push(sound.id);
		}
	}
	for (let num of remove_arr) {
		for (let i = sounds.length - 1; i >= 0; i--) {
			if (num == sounds[i].id) {
				sounds.splice(i, 1);
			}
		}
	}
}

function keyPressed() {
	let sound = new Sound(frameCount);
	sounds.push(sound);
}

class Sound {
	constructor(id) {
		this.id = id;
		let music_scales = [261, 293, 329, 349, 391, 440, 493];
		let octaves = [1 / 8, 1 / 4, 1 / 2, 1, 2];
		let types = ["sine", "triangle", "square", "sawtooth"];
		this.type = random(types);
		this.freq = random(music_scales) * random(octaves);
		this.osc = new p5.Oscillator(this.type);
		this.amplitude = new p5.Amplitude();
		this.reverb = new p5.Reverb();
		this.amplitude.setInput(this.reverb);
		this.reverb.process(this.osc, random(2, 4), random(2));
		this.time = 100 * int(random(1, 10));
		this.osc.freq(this.freq, 0);
		this.osc.amp(0, 0);
		this.osc.amp(0.3, 0);
		this.osc.amp(0, this.time / 1000);
		this.isPlaying = false;
		this.lifeCount = 500;
		this.pos = createVector(random(width), random(height));
	}
	run() {
		this.audioPlay();
		this.update();
		this.display();
	}
	audioPlay() {
		if (this.isPlaying == false) {
			this.osc.start();
			this.isPlaying = true;
		}
	}
	update() {
		this.lifeCount--;
	}
	display() {
		let level = this.amplitude.getLevel();
		let r = map(this.lifeCount, 500, 0, 0, 1000);
		switch (this.type) {
			case "sine":
				stroke(0, 0, 100, level * 10000);
				noFill();
				strokeWeight(10);
				circle(this.pos.x, this.pos.y, r);
				break;
			case "triangle":
				push();
				translate(this.pos.x, this.pos.y);
				rotate(frameCount);
				stroke(0, 0, 100, level * 10000);
				noFill();
				strokeWeight(10);
				beginShape();
				for (let i = 0; i < 3; i++) {
					vertex(cos(i * 360 / 3) * r, sin(i * 360 / 3) * r);
				}
				endShape(CLOSE);
				pop();
				break;
			case "square":
				push();
				translate(this.pos.x, this.pos.y);
				rotate(frameCount);
				stroke(0, 0, 100, level * 10000);
				noFill();
				strokeWeight(10);
				beginShape();
				for (let i = 0; i < 4; i++) {
					vertex(cos(i * 360 / 4) * r, sin(i * 360 / 4) * r);
				}
				endShape(CLOSE);
				pop();
				break;
			case "sawtooth":
				push();
				translate(0, this.pos.y);
				let n = 0;
				beginShape();
				for (let i = 0; i < int(this.freq / 10); i++) {
					let x = map(i, 0, int(this.freq / 10) - 1, 0, width);
					if (n % 2 == 0) {
						vertex(x, this.freq / 5);
					} else {
						vertex(x, 0);
					}
					n++;
				}
				vertex(width, height);
				vertex(0, height);
				endShape();
				pop();
				break;
		}
	}
}