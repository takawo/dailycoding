let capture;
let movers = [];
let mover_num = 25;

function setup() {
	createCanvas(1280, 720);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	let constraints = {
		video: {
			mandatory: {
				minWidth: 1280,
				minHeight: 720
			},
			optional: [{
				maxFrameRate: 30
			}]
		},
		audio: false
	};
	capture = createCapture(constraints);
	capture.hide();
	background(0, 0, 90);
	for (let i = 0; i < mover_num; i++) {
		let mover = new Mover();
		movers.push(mover);

	}
}

function draw() {
	// blendMode(LIGHTEST);
	for (let mover of movers) {
		mover.update();
		mover.display();
	}
	// if (capture.loadedmetadata) {
	//   let img = capture.get();
	//   image(img, 0, 0);
	// }

}

class Mover {
	constructor() {
		this.sep = 4;
		this.x = random(width);
		this.y = random(height);
		this.w = random(width / this.sep);
		this.h = random(height / this.sep);
		this.xTarget = random(width);
		this.yTarget = random(height);
		this.wTarget = random(width / this.sep);
		this.hTarget = random(height / this.sep);
	}
	update() {
		let deltaTime = 1.0 / 60.0;
		let k = 10.0;
		this.x = lerp(this.xTarget, this.x, exp(-k * deltaTime));
		this.y = lerp(this.yTarget, this.y, exp(-k * deltaTime));
		this.w = lerp(this.wTarget, this.w, exp(-k * deltaTime));
		this.h = lerp(this.hTarget, this.h, exp(-k * deltaTime));

		if (dist(this.x, this.y, this.xTarget, this.yTarget) < 1) {
			this.xTarget = random(width);
			this.yTarget = random(height);
			this.wTarget = random(width / this.sep);
			this.hTarget = random(height / this.sep);
		}
	}
	display() {
		let img_trim = capture.get(this.x - this.w / 2, this.y - this.h / 2, max(this.w, 1), max(this.h, 1));
		push();
		translate(this.x, this.y);
		// rotate(a);
		drawingContext.shadowColor = color(0, 0, 0, 10);
		drawingContext.shadowBlur = max(this.w, this.h) / 2;
		// rectMode(CENTER);
		noStroke();
		imageMode(CENTER);
		image(img_trim, 0, 0);
		// rect(0, 0, w, h);
		pop();
	}

}