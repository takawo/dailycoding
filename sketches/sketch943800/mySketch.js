// var ball;
let bases = [];
let balls = [];
let faceapi;
let video;
let detections;
let osc;
let palette = ["#EDF7F5", "#B7D7D8", "#FF8984", "#204E5F", "#FFC6A8"];

const detection_options = {
  withLandmarks: true,
  withDescriptors: false,
}


function setup() {
  createCanvas(640, 480);
  colorMode(HSB,360,100,100,100);
  angleMode(DEGREES);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  faceapi = ml5.faceApi(video, detection_options, modelReady)
}

function draw() {
  image(video.get(), 0, 0, width, height);
  drawingContext.shadowColor = color(0, 0, 0, 33);
  drawingContext.shadowBlur = 15;
  drawingContext.shadowOffsetY = 15 / 2;

  if (detections) {
    if (detections.length > 0 && frameCount % 2 == 0) {
      for (let i = 0; i < detections.length; i++) {
        let positions = detections[i].landmarks._positions;
        let p1 = positions[63];
        let p2 = positions[67];
        let p3 = positions[49];
        let p4 = positions[55];
        let distanceA = dist(p1._x, p1._y, p2._x, p2._y);
        let distanceB = dist(p3._x, p3._y, p4._x, p4._y);
        if (distanceA > distanceB / 2) {
          let center = createVector((p1._x + p2._x) / 2,
            (p1._y + p2._y) / 2);
          let freq = constrain(map(center.y, 0, height, 800, 0), 100, 500);
          let pan = constrain(map(center.x, 0, width, -1, 1), -1, 1);
          let amp = constrain(map(distanceA, 0, 100, 0, 0.2), 0, 0.2);
          osc.freq(freq, 0.1);
          osc.amp(amp, 0);
          osc.pan(pan, 0.1);
          let ball = matter.makeBall(center.x, center.y, distanceA);
          ball.color = random(palette);
          balls.push(ball);
        } else {
          osc.amp(0, 0.1);
        }

      }
    }
  }
  for (let base of bases) {
    noStroke();
    fill(0,0,50);
    base.show();
  }

  for (let i = balls.length - 1; i >= 0; i--) {
    let ball = balls[i];
    let x = ball.getPositionX();
    let y = ball.getPositionY();
    let c = random(palette);
    fill(ball.color                                                                                                                                                                                                                      );
    ball.show();
    if (x - ball.width / 2 > width || x + ball.width / 2 < 0 ||
      y - ball.height / 2 > height || y + ball.height / 2 < 0) {
      matter.forget(ball);
      balls.splice(i, 1);
    }
  }

}

function modelReady() {
  console.log('ready!')
  console.log(faceapi)
  faceapi.detect(gotResults);
  matter.normalGravity();

  osc = new p5.Oscillator('sine');
  osc.amp(0, 0);
  osc.start();
  let cols = 3;
  let offset = width / 20;
  let margin = offset*2;
  let w = (width - offset * 2 - margin * (cols - 1)) / cols;
  for (let i = 0; i < cols; i++) {
    let x = offset + i * (w + margin);
    let base = matter.makeBarrier(x + w / 2, height - 100, w, 25);
    bases.push(base);
  }
}

function gotResults(err, result) {
  if (err) {
    console.log(err)
    return
  }
  detections = result;

  faceapi.detect(gotResults)
}

