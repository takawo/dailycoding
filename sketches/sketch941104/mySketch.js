let g;
let palette = ["#4D6F83", "#B1B0B1", "#278DD3", "#F8B623", "#3C494F", "#D51311", "#FDFDFD", "#02020C"];

let offset;
let angle;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	g = createGraphics(width, height);
	g.angleMode(DEGREES);
}

function draw() {
	background(0, 0, 95);
	g.clear();
	offset = width / 20;
	angle = random(-15, 15);
	// separateGrid(0, 0, width, this);

	let w = sqrt(width * width + height * height);
	g.push();
	g.translate(g.width / 2, g.height / 2);
	g.rotate(angle);
	g.translate(-w / 2, -w / 2);
	separateGrid(0, 0, w, g);
	g.pop();

	// image(g,0,0);
	separateGrid2(-offset, -offset, width + offset * 2, this);
	// background(220);
	// noLoop();
	frameRate(.5);
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
				g.drawingContext.shadowColor = color(0, 255 * 15 / 100);
				g.drawingContext.shadowBlur = w / 5;
				g.noStroke();
				g.rect(i, j, w, w);
				// g.triangle(i,j,i+w,j,i,j+w);
				// g.fill(random(palette));
				// g.triangle(i+w,j+w,i+w,j,i,j+w);
				// g.circle(i+w/2,j+w/2,w);
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
				let hh = ww;
				let x = int(random(g.width - ww));
				let y = int(random(g.height - hh));
				let ratioW = 0.9;
				let g_trim = g.get(x, y, ww, hh);
				drawingContext.shadowColor = color(0, 0, 0, 33);
				drawingContext.shadowBlur = 10;
				push();
				translate(i + w / 2, j + w / 2);
				rotate(int(random(4)) * 360 / 4 - angle);
				imageMode(CENTER);
				image(g_trim,  0,0, w * 18 / 20, w * 18 / 20);
				pop();
			}
		}
	}
}