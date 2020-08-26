let g;
let palette = ["#10111C", "#23AECC", "#ECE1B4", "#CC3016", "#F2C96E", "#178FA6"];

function setup() {
	createCanvas(800, 800);
	g = createGraphics(width, height);

}

function draw() {
	g.clear();
	background(240);
	
	separateGrid(0, 0, width, g);
	separateGrid2(0, 0, width, this);
	// noLoop();
	frameRate(0.5);
}


function separateGrid(x, y, d, g) {
	let sepNum = int(random(1, 5));
	let w = d / sepNum;
	let ratio = 1 / 20;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && w > width / 5 || w > width) {
				separateGrid(i, j, w, g);
			} else {
				g.fill(random(palette));
				g.drawingContext.shadowColor = color(0, 200);
				g.drawingContext.shadowBlur = w / 2;
				g.noStroke();
				g.rect(i, j, w, w);
			}
		}
	}
}

function separateGrid2(x, y, d) {
	let sepNum = int(random(1, 5));
	let w = d / sepNum;
	let ratio = 1 / 20;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && w > width / 5 || w > width) {
				separateGrid2(i, j, w);
			} else {
				let ww = constrain(random(g.width), 1, g.width);
				let hh = w;
				let x = random(g.width - ww);
				let y = random(g.height - hh);
				let g_trim = g.get(x, y, ww, hh);
				drawingContext.shadowColor = color(0);
				drawingContext.shadowBlur = w / 5;
				image(g_trim, i + w / 10, j + w / 10, w * 8 / 10, w * 8 / 10);
			}
		}
	}
}