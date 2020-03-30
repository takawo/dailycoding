let points = [];
let cell_num = 11;
const cols = cell_num;
const rows = cell_num;
const offset = 80;
const noiseScale = 800;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
	background(0,0,0);
  angleMode(DEGREES);
	blendMode(ADD);
	noLoop();

  let w = (width - offset * 2) / cols;
  let h = (height - offset * 2) / rows;

  for (let j = 0; j <= rows; j++) {
    points[j] = [];
    for (let i = 0; i <= cols; i++) {
      let x = offset + w * i;
      let y = offset + h * j;
      //rect(x, y, w, h);

      let n = noise(x / noiseScale, y / noiseScale);
      let angle = map(n, 0, 1, -180, 180);
      let r = sin(x + y * width) * w / (n * 3.5);
      let x2 = x + cos(angle) * r;
      let y2 = y + sin(angle) * r;
      // point(x2, y2);
      points[j][i] = createVector(x2, y2);
    }
  }

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let quadPoints = [];
      let p1 = points[j][i];
      quadPoints.push(p1);
      let p2 = points[j][i + 1];
      quadPoints.push(p2);
      let p3 = points[j + 1][i + 1];
      quadPoints.push(p3);
      let p4 = points[j + 1][i];
      quadPoints.push(p4);
      //fill(random(360), 80, 100);
      //quad(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);

      let eachPoints = [];
      let sep_points = int(random(10, 30))*int(random(3,8));

      for (let k = 0; k < quadPoints.length; k += 1 / sep_points) {
        let n = int(k);
        let m = int(k + 1) % quadPoints.length;
        let f = k % 1;
        let pA = quadPoints[n];
        let pB = quadPoints[m];
        let pC = p5.Vector.lerp(pA, pB, f);
        eachPoints.push(pC);
      }
      let step_points = int(random(2, 5)) + random(1, 10) / 10;
			let cn = (j * cols + i) % eachPoints.length;
      for (let c = 0; c < eachPoints.length; c++) {
        let d = int(c + eachPoints.length / step_points) % eachPoints.length;
        let p1 = eachPoints[c];
        let p2 = eachPoints[d];
        stroke(0,0,100,5);
        line(p1.x, p1.y, p2.x, p2.y);
      }
    }
  }
	//saveCanvas("output.png");
}