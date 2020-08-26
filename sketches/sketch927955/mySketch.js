//reference : christopher carlson's awesome article😁
//https://christophercarlson.com/portfolio/multi-scale-truchet-patterns/

let palette = ["#10111C", "#23AECC", "#ECE1B4", "#CC3016", "#F2C96E", "#178FA6"];
let combination = [];
let offset;
let graphices = [];
let texture;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  offset = width / 10;
  combination = createArrPair(palette);
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < combination.length; j++) {
      let pair = combination[j];
      for (let k = 0; k < 2; k++) {
	      let g = createGraphics(width * 8 / 10, height * 8 / 10);
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
  separateGrid(offset, offset, width - offset * 2);
  frameRate(0.5);
  //noLoop();
}

function separateGrid(x, y, d) {
  let sepNum = 2;
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && w > width / 10 || w > width/4) {
        separateGrid(i, j, w);
      } else {
        // rect(i, j, w, w);
        let graphics = random(graphices);
        push();
        translate(i + w / 2, j + w / 2);
        // rotate(int(random(4)) * 360 / 4);
        imageMode(CENTER);
        drawingContext.shadowColor = color(random(palette)+hex(128,2));
        drawingContext.shadowBlur = w;
        image(graphics, 0, 0, w * 2, w * 2);
        pop();
      }
    }
  }
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