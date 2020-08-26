//reference : christopher carlson's awesome article😁
//https://christophercarlson.com/portfolio/multi-scale-truchet-patterns/

let url = "https://coolors.co/ffcdb2-ffb4a2-e5989b-b5838d-6d6875";
let palette = createPallete(url);
let combination = [];
let offset;
let graphices = [];
let texture;
let arr = [];

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
  drawingContext.imageSmoothingEnabled=false;
	
	offset = width / 10;
	combination = createArrPair(palette);
	for (let i = 0; i < 15; i++) {
		for (let j = 0; j < combination.length; j++) {
			let pair = combination[j];
			for (let k = 0; k < 2; k++) {
				let num = int(random(1,100));
				let g = createGraphics(width * 1 / num, height * 1 / num);
				g.drawingContext.imageSmoothingEnabled=false;
				if (k == 1) {
					let temp = pair.c2;
					pair.c2 = pair.c1;
					pair.c1 = temp;
				}
				g.angleMode(DEGREES);
				// g.rect(0,0,g.width,g.height);
				let d = g.width / 2;
				g.push();
				g.translate(d, d);
				g.noStroke();
				g.fill(pair.c1);
				g.rectMode(CENTER);
				g.rect(0, 0, d, d);
				g.ellipse(-d / 2, -d / 2, d * 2 / 3, d * 2 / 3);
				g.ellipse(d / 2, -d / 2, d * 2 / 3, d * 2 / 3);
				g.ellipse(d / 2, d / 2, d * 2 / 3, d * 2 / 3);
				g.ellipse(-d / 2, d / 2, d * 2 / 3, d * 2 / 3);
				let shapeNum = i;
				switch (shapeNum) {
					case 0:
						g.stroke(pair.c2);
						g.strokeWeight(d * 1 / 3);
						g.noFill();
						g.arc(d / 2, -d / 2, d, d, 90, 180);
						g.arc(-d / 2, +d / 2, d, d, 180 + 90, 180 + 180);
						break;
					case 1:
						g.stroke(pair.c2);
						g.strokeWeight(d * 1 / 3);
						g.noFill();
						g.arc(-d / 2, -d / 2, d, d, 0, 90);
						g.arc(d / 2, d / 2, d, d, 0 + 180, 90 + 180);
						break;
					case 2:
						g.stroke(pair.c2);
						g.strokeWeight(d * 1 / 3);
						g.noFill();
						g.line(-d / 2, 0, d / 2, 0);
						g.noStroke();
						g.fill(pair.c2);
						g.ellipse(0, -d / 2, d * 1 / 3, d * 1 / 3);
						g.ellipse(0, d / 2, d * 1 / 3, d * 1 / 3);
						break;
					case 3:
						g.stroke(pair.c2);
						g.strokeWeight(d * 1 / 3);
						g.noFill();
						g.line(0, -d / 2, 0, d / 2);
						g.noStroke();
						g.fill(pair.c2);
						g.ellipse(-d / 2, 0, d * 1 / 3, d * 1 / 3);
						g.ellipse(d / 2, 0, d * 1 / 3, d * 1 / 3);
						break;
					case 4:
						g.noStroke();
						g.fill(pair.c2);
						g.ellipse(0, -d / 2, d * 1 / 3, d * 1 / 3);
						g.ellipse(0, d / 2, d * 1 / 3, d * 1 / 3);
						g.ellipse(-d / 2, 0, d * 1 / 3, d * 1 / 3);
						g.ellipse(d / 2, 0, d * 1 / 3, d * 1 / 3);
						break;
					case 5:
						g.stroke(pair.c2);
						g.strokeWeight(d * 1 / 3);
						g.noFill();
						g.arc(d / 2, -d / 2, d, d, 90, 180);
						g.arc(-d / 2, +d / 2, d, d, 180 + 90, 180 + 180);
						g.arc(-d / 2, -d / 2, d, d, 0, 90);
						g.arc(d / 2, d / 2, d, d, 0 + 180, 90 + 180);
						g.noStroke();
						g.fill(pair.c2);
						g.ellipse(0, 0, d * 1 / 3, d * 1 / 3);
						break;
					case 6:
						g.stroke(pair.c2);
						g.strokeWeight(d * 1 / 3);
						g.noFill();
						g.line(-d / 2, 0, d / 2, 0);
						g.line(0, -d / 2, 0, d / 2);
						break;
					case 7:
						g.stroke(pair.c2);
						g.strokeWeight(d * 1 / 3);
						g.noFill();
						g.arc(-d / 2, -d / 2, d, d, 0, 90);
						g.noStroke();
						g.fill(pair.c2);
						g.ellipse(0, d / 2, d * 1 / 3, d * 1 / 3);
						g.ellipse(d / 2, 0, d * 1 / 3, d * 1 / 3);
						break;
					case 8:
						g.rotate(90);
						g.stroke(pair.c2);
						g.strokeWeight(d * 1 / 3);
						g.noFill();
						g.arc(-d / 2, -d / 2, d, d, 0, 90);
						g.noStroke();
						g.fill(pair.c2);
						g.ellipse(0, d / 2, d * 1 / 3, d * 1 / 3);
						g.ellipse(d / 2, 0, d * 1 / 3, d * 1 / 3);
						break;
					case 9:
						g.rotate(180);
						g.stroke(pair.c2);
						g.strokeWeight(d * 1 / 3);
						g.noFill();
						g.arc(-d / 2, -d / 2, d, d, 0, 90);
						g.noStroke();
						g.fill(pair.c2);
						g.ellipse(0, d / 2, d * 1 / 3, d * 1 / 3);
						g.ellipse(d / 2, 0, d * 1 / 3, d * 1 / 3);
						break;
					case 10:
						g.rotate(270);
						g.stroke(pair.c2);
						g.strokeWeight(d * 1 / 3);
						g.noFill();
						g.arc(-d / 2, -d / 2, d, d, 0, 90);
						g.noStroke();
						g.fill(pair.c2);
						g.ellipse(0, d / 2, d * 1 / 3, d * 1 / 3);
						g.ellipse(d / 2, 0, d * 1 / 3, d * 1 / 3);
						break;
					case 11:
						g.rotate(0);
						g.stroke(pair.c2);
						g.strokeWeight(d * 1 / 3);
						g.noFill();
						g.arc(-d / 2, -d / 2, d, d, 0, 90);
						g.arc(d / 2, -d / 2, d, d, 90 + 0, 90 + 90);
						g.line(-d / 2, 0, d / 2, 0);
						g.noStroke();
						g.fill(pair.c2);
						g.ellipse(0, d / 2, d * 1 / 3, d * 1 / 3);
						break;
					case 12:
						g.rotate(90);
						g.stroke(pair.c2);
						g.strokeWeight(d * 1 / 3);
						g.noFill();
						g.arc(-d / 2, -d / 2, d, d, 0, 90);
						g.arc(d / 2, -d / 2, d, d, 90 + 0, 90 + 90);
						g.line(-d / 2, 0, d / 2, 0);
						g.noStroke();
						g.fill(pair.c2);
						g.ellipse(0, d / 2, d * 1 / 3, d * 1 / 3);
						break;
					case 13:
						g.rotate(180);
						g.stroke(pair.c2);
						g.strokeWeight(d * 1 / 3);
						g.noFill();
						g.arc(-d / 2, -d / 2, d, d, 0, 90);
						g.arc(d / 2, -d / 2, d, d, 90 + 0, 90 + 90);
						g.line(-d / 2, 0, d / 2, 0);
						g.noStroke();
						g.fill(pair.c2);
						g.ellipse(0, d / 2, d * 1 / 3, d * 1 / 3);
						break;
					case 14:
						g.rotate(270);
						g.stroke(pair.c2);
						g.strokeWeight(d * 1 / 3);
						g.noFill();
						g.arc(-d / 2, -d / 2, d, d, 0, 90);
						g.arc(d / 2, -d / 2, d, d, 90 + 0, 90 + 90);
						g.line(-d / 2, 0, d / 2, 0);
						g.noStroke();
						g.fill(pair.c2);
						g.ellipse(0, d / 2, d * 1 / 3, d * 1 / 3);
						break;
				}
				g.pop();
				graphices.push(g);
			}
		}
	}

	texture = createGraphics(width, height);
	texture.colorMode(HSB, 360, 100, 100, 100);
	texture.angleMode(DEGREES);

	texture.stroke(0, 0, 100, 3);
	for (let i = 0; i < width * height * 1 / 100; i++) {
		let x = random(width);
		let y = random(height);
		let angle = 90 + random(15) * (random(100) > 50 ? -1 : 1);
		let d = width / 20;
		texture.line(x + cos(angle) * d, y + sin(angle) * d,
			x + cos(angle + 180) * d, y + sin(angle + 180) * d);
	}

}

function draw() {
	background(0, 0, 90);
	let offset = width / 8;
	arr = [];
	separateGrid(offset, offset, width - offset * 2);
	arr.sort(compare);
	push();
	translate(width/2,height/2);
	rotate(int(random(4)) * 360/4);
	translate(-width/2,-height/2);
	for (let obj of arr) {
		// drawingContext.shadowColor = color(0, 0, 0, 33);
		// drawingContext.shadowBlur = obj.w / 2;
		imageMode(CENTER);
		image(obj.g, obj.x, obj.y, obj.w, obj.w);
	}
	pop();
	imageMode(CORNER);
	image(texture, 0, 0);
	frameRate(0.5);
	noLoop();
}

function separateGrid(x, y, d) {
	let sepNum = 2;
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && w > width / 10 || w > width / 4) {
				separateGrid(i, j, w);
			} else {
				// rect(i, j, w, w);
				let graphics = random(graphices);
				// push();
				// translate(i + w / 2, j + w / 2);
				arr.push({
					g: graphics,
					x: i + w / 2,
					y: j + w / 2,
					w: w * 2,
				});
				// rotate(int(random(4)) * 360 / 4);
				// imageMode(CENTER);
				// drawingContext.shadowColor = color(random(palette) + hex(128, 2));
				// drawingContext.shadowBlur = w;
				// image(graphics, 0, 0, w * 2, w * 2);
				// pop();
			}
		}
	}
}

function compare(a, b) {
	// Use toUpperCase() to ignore character casing
	const aw = a.w;
	const bw = b.w;

	let comparison = 0;
	if (aw > bw) {
		comparison = -1;
	} else if (aw < bw) {
		comparison = 1;
	}
	return comparison;
}

function createArrPair(arr) {
	let newArr = [];
	for (let i = 0; i < arr.length; i++) {
		if (i <= arr.length - 1) {
			for (let j = i + 1; j < arr.length; j++) {
				newArr.push({
					c1: arr[i],
					c2: arr[j]
				});
			}
		}
	}
	return newArr;
}

function createPallete(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');
	for (let i = 0; i < arr.length; i++) {
		arr[i] = '#' + arr[i];
	}
	return arr;
}