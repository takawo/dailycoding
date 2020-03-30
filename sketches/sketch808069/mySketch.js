let barriers = [];
let balls = [];
let previewStart;
let cells, offset, margin, cellSize;
let pallete = ["#DADCDA","#DE200C","#3A6DA8","#A8BACC","#0A1D4E","#CD4645","#C0AEB5","#838CA9"];
let bgColor;
let ballColor;
function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);

  matter.init();
  matter.changeGravity(0, 1);

  setInterval(addBall, 150);

  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  for (let i = 0; i < width * height * 20 / 100; i++) {
    bg.fill(0, 0, random(100) > 50 ?100:0, 3);

    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    bg.noStroke();
    bg.ellipse(x, y, w, h);
  }  
  
  
  cells = int(random(6, 10));
  offset = width / 10;
  margin = 10;
  cellSize = (width - offset * 2 - margin * (cells - 1)) / cells;
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset + i * (cellSize + margin) + cellSize / 2;
      let y = offset + j * (cellSize + margin) + cellSize / 2;
      let length = sqrt(sq(cellSize) * 2) * 0.75;
      var barrier = matter.makeBarrier(x, y, length, 5, {
        angle: random(100) > 50 ? radians(45) : radians(-45),
      });
      barriers.push(barrier);
    }
  }
  let bgNum = int(random(pallete.length));
  bgColor = pallete[bgNum];
  pallete.splice(bgNum, 1);
  let ballNum = int(random(pallete.length));
  ballColor = pallete[ballNum];
  pallete.splice(ballNum, 1);
}

function addBall() {
  randomSeed(frameCount*100);
  let x = offset + int(random(cells)) * (cellSize + margin) + cellSize / 2;
  // balls.push(matter.makeBall(x, 0, int(random(1,4))*5));
  balls.push(matter.makeBall(x, 0, 10));
  
}

function draw() {
  background(bgColor);

  
  noStroke();
  randomSeed(0);
  for (var i = 0; i < barriers.length; i++) {
    fill(random(pallete));
    barriers[i].show();
  }

  for (var j = balls.length - 1; j >= 0; j--) {
    var ball = balls[j];
    fill(ballColor);
    ball.show();
    if (ball.isOffCanvas()) {
      matter.forget(ball);
    }
  }
  image(bg,0,0);
}