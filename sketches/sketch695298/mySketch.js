let cells, cols, rows;
let margin, offset;
let w, h;

let bg;
let pallete;
let randomSeedNum;

let Engine = Matter.Engine;
let Render = Matter.Render;
let World = Matter.World;
let Bodies = Matter.Bodies;
let Composite = Matter.Composite;
let engine;

let objectArr = [];

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	init();
}

function init() {

	pallete = [color(8, 36, 100), color(203, 31, 56), color(203, 67, 41), color(170, 52, 68)];
	randomSeedNum = random(10000);

	cells = int(random(2, 4)) * int(random(2, 4));
	cols = cells;
	rows = cells;

	offset = int(random(2, 4)) * 20;
	margin = offset / int(random(2, 5));
	w = (width - (offset * 2 + margin * (cols - 1))) / cols;
	h = (height - (offset * 2 + margin * (rows - 1))) / rows;

	bg = createGraphics(width, height);
	bg.colorMode(HSB, 360, 100, 100, 100);
	bg.background(0, 0, 95);
	drawNoiseBackground(50000, bg);

	engine = Engine.create();
	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			let x = map(i, 0, cols - 1, offset, width - offset - w);
			let y = map(j, 0, rows - 1, offset, height - offset - h);

			createBoxes(x, y, w, h, 20, objectArr);
			createGround(x, y, w, h, objectArr);
		}
	}

	World.add(engine.world, objectArr);
	Engine.run(engine);
}

function drawNoiseBackground(_n, _graphics) {
	for (let i = 0; i < _n; i++) {
		let x = random(0, width);
		let y = random(0, height);
		let w = random(1, 2);
		let h = random(1, 2);
		_graphics.noStroke();
		_graphics.fill(0, 0, 0, 2);
		_graphics.ellipse(x, y, w, h);
	}
}

function createBoxes(_x, _y, _w, _h, _n, _worldArr) {
	for (let i = 0; i < _n; i++) {
		let boxX = int(random(_x, _x + _w));
		let boxY = int(random(_y, _y + _h / 2));
		let boxW = int(random(1, 5)) * _w / 20;
		let boxH = int(random(1, 5)) * _h / 20;
		let box = Bodies.rectangle(boxX, boxY, boxW, boxH);
		_worldArr.push(box);
	}
}


function createGround(_x, _y, _w, _h, _worldArr) {
	let groundW = _w;
	let groundH = _h * 1 / 10;
	let groundX = _x + _w / 2;
	let groundY = _y + _h - groundH / 2;
	let ground = Bodies.rectangle(groundX, groundY, groundW, groundH, {
		isStatic: true
	});
	_worldArr.push(ground);
}


function draw() {
	randomSeed(randomSeedNum);
	var bodies = Composite.allBodies(engine.world);
	image(bg, 0, 0);

	//   for (let j = 0; j < rows; j++) {
	//     for (let i = 0; i < cols; i++) {
	//       let x = map(i, 0, cols - 1, offset, width - offset - w);
	//       let y = map(j, 0, rows - 1, offset, height - offset - h);

	//       fill(0, 0, 100, 10);
	//       noStroke();
	//       rect(x, y, w, h);
	//     }
	//   }

	for (let j = 0; j < objectArr.length; j++) {
		let obj = objectArr[j];
		if (!obj.isStatic) {
			fill(pallete[int(random(pallete.length))]);
			stroke(0, 0, 50, 30);
			strokeWeight(0.5);
		} else {
			fill(color(0, 0, 45));
			noStroke();
			noFill();
			noStroke();
		}
		let vertices = obj.vertices;
		beginShape();
		for (var i = 0; i < vertices.length; i++) {
			vertex(vertices[i].x, vertices[i].y);
		}
		endShape(CLOSE);
	}
}