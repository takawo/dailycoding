const cells = 8;
const rows = cells;
const cols = cells;
const offset = 40;
const margin = offset / 4;
let w, h;

function setup() {
  createCanvas(800, 800, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  w = (width - offset * 2 - margin * (cols - 1)) / cols;
  h = (height - offset * 2 - margin * (rows - 1)) / rows;

}

function draw() {
  background(0);
	orbitControl();
  ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 1500);
  normalMaterial();
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, -width / 2 + offset, width / 2 - w - offset);
      let y = map(j, 0, rows - 1, -width / 2 + offset, width / 2 - w - offset);
      push();
      translate(x + w / 2, y + h / 2, 0);
      // rotateX(random(360));
      // rotateY(random(360));
      // rotateZ(random(360));
      rotateX(random(360));
      rotateY(random(360));
      rotateZ(random(360));
      box(w / 2, h / 2);
      pop();
    }
  }
  noLoop();
}