let barriers = [];
let shapes = [];
let pallete = ["#DADCDA", "#DE200C", "#3A6DA8", "#A8BACC", "#0A1D4E", "#CD4645", "#C0AEB5", "#838CA9"];
let bgColor;
let shapeColor;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);

	matter.init();
	matter.changeGravity(0, .5);

	setInterval(addShape, 150);

	bg = createGraphics(width, height);
	bg.colorMode(HSB, 360, 100, 100, 100);
	for (let i = 0; i < width * height * 20 / 100; i++) {
		bg.fill(0, 0, random(100) > 50 ? 100 : 0, 3);

		let x = random(width);
		let y = random(height);
		let w = random(3);
		let h = random(3);
		bg.noStroke();
		bg.ellipse(x, y, w, h);
	}
	separateGrid(0, 0, width);
	let bgNum = int(random(pallete.length));
	bgColor = pallete[bgNum];
	pallete.splice(bgNum, 1);
	let shapeNum = int(random(pallete.length));
	shapeColor = pallete[shapeNum];
	pallete.splice(shapeNum, 1);
}

function addShape() {
	//randomSeed(frameCount*100);
	let x = random(width);
	if (random(100) > 50) {
		shapes.push(matter.makeBall(x, 0, 15));
	} else {
		shapes.push(matter.makeBlock(x, 0, 10, 20));
	}
}

function draw() {
	background(bgColor);

	noStroke();
	randomSeed(0);
	for (var i = 0; i < barriers.length; i++) {
		fill(random(pallete));
		barriers[i].show();
	}
	randomSeed(frameCount * 10000);

	for (var j = shapes.length - 1; j >= 0; j--) {
		var shape = shapes[j];
		fill(shapeColor);
		shape.show();
		if (shape.isOffCanvas()) {
			matter.forget(shape);
		}
	}
	image(bg, 0, 0);
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 4) {
				separateGrid(i, j, w);
			} else {
				rect(i, j, w, w);
				let x = i + w / 2;
				let y = j + w / 2;
				let length = sqrt(sq(w) * 2) * 0.65;
				var barrier = matter.makeBarrier(x, y, length, 5, {
					angle: random(100) > 50 ? radians(45) : radians(-45),
				});
				barriers.push(barrier);
			}
		}
	}
}