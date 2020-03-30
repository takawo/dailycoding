const pallete = ["#ED5D53", "#052D39", "#095974", "#0C86AD", "#FBBF23", "#002CAE"];
const cells = 10;
const cols = cells;
const rows = cells;
const offset = 80;
const margin = offset / 2;

function setup() {
  createCanvas(800, 800, WEBGL);
  colorMode(RGB, 255, 255, 255, 255);
  angleMode(DEGREES);

}

function draw() {
  background(33);
  orbitControl();
  scale(0.75);
  randomSeed(1000);


  drawNoise(10000);

  let d = (width - offset * 2 - margin * (cols - 1)) / cols;

  ortho(-width / 2 + offset, width / 2 - offset, -height / 2 + offset, height / 2 - offset, -1500, 1500);
  directionalLight(color(255, 255, 255, 255 / 8), 0, 0, 1500);
  directionalLight(color(255, 255, 255, 255 / 8), -width / 2, 0, 1500);
  directionalLight(color(255, 255, 255, 255 / 8), width / 2, 0, 1500);
  ambientLight(color(255 / 4));

  let locX = width / 2;
  let locY = height / 2;

  pointLight(color(250, 250, 250, 8), -locX, -locY, 1500);
  pointLight(color(250, 250, 250, 8), locX, -locY, 1500);
  pointLight(color(250, 250, 250, 8), locX, locY, 1500);
  pointLight(color(250, 250, 250, 8), -locX, locY, 1500);


  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = map(i, 0, cols - 1, -width / 2 + offset, width / 2 - offset);
      let y = map(j, 0, rows - 1, -height / 2 + offset, height / 2 - offset);
      push();
      translate(x, y, 100);
      addAngle();
      planeBox(d);
      pop();
    }
  }
  //noLoop();
}

function addAngle() {
  let angleX = random();
  let angleY = random();
  let angleZ = random();
  let sum = angleX + angleY + angleZ;

  angleX = round(angleX / sum * 16);
  angleY = round(angleY / sum * 16);
  angleZ = round(angleZ / sum * 16);
  rotateX(angleX * 45);
  rotateY(angleY * 45);
  rotateZ(angleZ * 45);
  //print(angleX, angleY, angleZ);
}


function planeBox(_d) {
  let p = pallete.concat();
  for (var j = p.length - 1; j > 0; j--) {
    var r = Math.floor(random() * (j + 1));
    var tmp = p[j];
    p[j] = p[r];
    p[r] = tmp;
  }


  let i = 0;
  for (let angle = 0; angle < 360; angle += 90) {
    push();
    rotateX(angle);
    translate(0, _d / 2, 0);
    if (i % 2 == 0) {
      rotateX(90);
    }
    if (i % 2 == 1) {
      rotateX(-90);
    }
    noStroke();
    //noFill();
    //fill(p[0]);
    specularMaterial(p[0]);
    p.shift();
    plane(_d, _d);
    pop();
    i++;
  }
  for (let angle = 0; angle < 360; angle += 180) {
    push();
    rotateY(angle);
    translate(_d / 2, 0, 0);
    if (i % 2 == 0) {
      rotateY(90);
    }
    if (i % 2 == 1) {
      rotateY(-90);
    }
    noStroke();
    //fill(p[0]);
    specularMaterial(p[0]);

    p.shift();
    plane(_d, _d);
    pop();
    i++;
  }
}

function drawNoise(_n) {
  for (let i = 0; i < _n; i++) {
    let x = random(-width / 2 * 1.2, width / 2 * 1.2);
    let y = random(-height / 2 * 1.2, height / 2 * 1.2);
    let z = random(-1500, 1500);
    let w = random(1, 2);
    let h = random(1, 2);
    push();
    translate(x, y, z);
    noStroke();
    fill(255, 5);
    sphere(w, 3, 3);
    pop();
  }
}