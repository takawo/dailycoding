let cols = 8;
let rows = 8;
let offset = 40;
let w, h;
let sw = 3;
function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
	//strokeCap(PROJECT);
	strokeWeight(sw);
  w = (width - offset * 2) / cols;
  h = (height - offset * 2) / rows;
}

function draw() {
  background(220);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols, offset, width - offset);
      let y = map(j, 0, rows, offset, height - offset);
			rect(x,y,w,h);
      push();
      translate(x + w / 2, y + h / 2);
      rotate(floor(random(4)) * 360 / 4);
      line(-w / 2, h / 2, w / 2, -h / 2);
      let p1 = createVector(-w / 2, h / 2);
      let p2 = createVector(w / 2, -h / 2);
      let num = floor(random(4,10));
      for (let n = 0; n < 1; n += 1 / num) {
        let p3 = p5.Vector.lerp(p1, p2, n);
        line(p3.x, p3.y, p3.x, h / 2-sw);
      }
      rotate(floor(random(4)) * 360 / 4);
      let sAngle = floor(random(4)) * 360 / 4;
      let eAngle = (sAngle + floor(random(4)) * 360 / 4)%360;
      arc(0,0,w,h,sAngle,eAngle,PIE);
      pop();
    }
  }
  noLoop();
}