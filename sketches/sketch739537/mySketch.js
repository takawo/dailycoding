let pallete = ["#001029", "#003849", "#89FAE7", "#16A93F", "#FDFFFE", "#055B41", "#878978", "#B8DA9A"];
let ratio = 0.65;
let rs;
let bg;
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB,360,100,100,100);
  graphics = createGraphics(width,height);
  graphics.colorMode(HSB,360,100,100,100);
  drawNoiseBackground(50000,graphics);
  
  angleMode(DEGREES);
  rs = random(10000);
  bg = random(pallete); //ランダムな背景色
  pallete = pallete.filter(n => n !== bg); //選んだ背景色を配列から削除
}

function draw() {
  background(bg);
  image(graphics,0,0);
  randomSeed(rs);
  push();
  translate(width / 2, height / 2);
  let rMax = sqrt(sq(width / 2) + sq(height / 2)) * ratio;
  let rMin = rMax/8;
  let div = int(random(5, 25));
	let num = int(random(3,8));
  for (let r = rMax; r > rMin; r -= (rMax - rMin) / div) {
    strokeWeight(map(r,rMax,rMin,5,5));
    strokeCap(PROJECT);
    let arr = pallete.concat(); // palleteのコピー
    for (var i = arr.length - 1; i > 0; i--) {
      var m = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[m];
      arr[m] = tmp;
    }
    let c1 = arr[0];
    let c2 = arr[1];
    let c = c1;
    push();
    rotate(int(random(num)) * 360 / num);
    let points = [];
    // beginShape();
    for (let angle = 0; angle < 360; angle += 360 / num) {
      let x = cos(0 / 2 + angle) * r;
      let y = sin(0 / 2 + angle) * r;
      // vertex(x,y);
      points.push(createVector(x, y));
    }
    let step = 1 / int(random(15, 30));
    let current = 0;
    let oddEven = 0;
    while (current < 1) {
      let pointCurrent = map(current, 0, 1, 0, num);
      let pointNext = map(current + step, 0, 1, 0, num);
      let pointCurrentInt = int(pointCurrent);
      let pointNextInt = (pointCurrentInt + 1) % points.length;
      let pointCurrentFloat = pointCurrent % 1;
      let pointNextFloat = pointNext % 1;

      if (int(pointCurrent) == int(pointNext)) {
        let p1 = p5.Vector.lerp(points[pointCurrentInt],
          points[pointNextInt],
          pointCurrentFloat);
        let p2 = p5.Vector.lerp(points[pointCurrentInt],
          points[pointNextInt],
          pointNextFloat);
        if (oddEven % 2 == 0) {
          stroke(c);
          line(p1.x, p1.y, p2.x, p2.y);
          if (c == c1) {
            c = c2;
          } else {
            c = c1;
          }
        }
        // print(current);
      } else {
        let p1 = p5.Vector.lerp(points[pointCurrentInt],
          points[pointNextInt],
          pointCurrentFloat);
        let p2 = p5.Vector.lerp(points[pointCurrentInt],
          points[pointNextInt],
          1);
        let p3 = p5.Vector.lerp(points[pointNextInt],
          points[(pointNextInt + 1) % points.length],
          pointNextFloat);
        if (oddEven % 2 == 0) {
          stroke(c);
          line(p1.x, p1.y, p2.x, p2.y);
          line(p2.x, p2.y, p3.x, p3.y);
          if (c == c1) {
            c = c2;
          } else {
            c = c1;
          }
        }
      }
      oddEven++;
      current += step;
      if (current > 1) {
        current = 1;
      }
    }
    // endShape(CLOSE);
    pop();
  }
  pop();
  noLoop();
}

function drawNoiseBackground(_n, _graphics) {
	let c = color(0, 0, 100, 5);
	for (let i = 0; i < _n; i++) {
		let x = random(1) * width;
		let y = random(1) * height;
		let w = random(1, 3);
		let h = random(1, 3);
		_graphics.noStroke();
		_graphics.fill(c);
		_graphics.ellipse(x, y, w, h);
	}
}