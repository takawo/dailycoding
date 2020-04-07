let data;
let depthMax = 4;

let textGraphics;
let textureGraphics;
let graphics_num = 2;
let tf;
let font;

function preload() {
	let url = 'https://gist.githubusercontent.com/shinout/1403826/raw/421d01202c4b065cd2c4c5f4294492bd2d8809b8/jis1_regular_merged.json';
	data = loadJSON(url);
	font = loadFont("NotoSerifJP-Bold.otf");
}

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	tf = new Transformer();

	textGraphics = createGraphics(width, height);
	textGraphics.colorMode(HSB, 360, 100, 100, 100);
	textGraphics.angleMode(DEGREES);

	textureGraphics = createGraphics(width, height);
	textureGraphics.colorMode(HSB, 360, 100, 100, 100);
	textureGraphics.angleMode(DEGREES);
}

function draw() {
	background(0, 0, 0);
	textGraphics.background(0, 0, 90);
	textureGraphics.clear();

	let offset = width / 20;
	separateGrid(offset, offset, width - offset * 2);
	image(textureGraphics, 0, 0);
	image(textGraphics, 0, 0);

	frameRate(1);
	noLoop();
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 80 && d > width / 4 || d > width * 0.6) {
				separateGrid(i, j, w);
			} else {

				let cx = i + w / 2;
				let cy = j + w / 2;
				textureGraphics.push();
				textureGraphics.translate(cx, cy);
				let l = w / 3;
				let depth = int(random(2, depthMax));
				tree(depth, l, textureGraphics);
				textureGraphics.pop();
				
				
				textGraphics.push();
				textGraphics.translate(cx, cy);
				let str = data[int(random(Object.keys(data).length))];
				let bound = font.textBounds(str, 0, 0, w);
      
				
				textGraphics.translate(-bound.x - bound.w / 2, -bound.y - bound.h / 2);

				textGraphics.textSize(w);
				textGraphics.textFont(font);

				textGraphics.push();
				textGraphics.fill(0, 0, 0);
				textGraphics.drawingContext.shadowColor = color(0, 0, 0);
				textGraphics.drawingContext.shadowBlur = w / 8;
				textGraphics.text(str, 0,0);
				textGraphics.pop();

				textGraphics.push();
				textGraphics.erase(255, 0);
				textGraphics.text(str,0,0);
				textGraphics.noErase();
				textGraphics.pop();
				
				textGraphics.pop();
				
			}
		}
	}
}

function tree(depth, l, g) {
	let len = 150;
	if (depth > 0) {
		let n = int(random(3, 10));
		for (let angle = 0; angle < 360; angle += 360 / n) {
			g.push();
			g.rotate(angle);
			g.stroke(0, 0, 100, 100);
			g.noFill();
			let sw = map(l, 0, len, 0, depthMax * 2);
			g.drawingContext.shadowColor = color(0, 0, 100);
			g.drawingContext.shadowBlur = l / 8;
			g.strokeWeight(sw);
			if (random(100) > 50) {
				g.bezier(0, 0, l / 2, l / 2, l / 2, -l / 2, l, 0);
			} else {
				g.bezier(0, 0, l / 2, -l / 2, l / 2, l / 2, l, 0);
			}
			g.translate(l, 0);
			g.rotate(random(360));
			tree(depth - 1, l * random(0.2, 0.7), g);
			g.pop();
		}
	}
}