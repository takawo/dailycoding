let video;
let poseNet;
let poses = [];

function setup() {
  createCanvas(640, 480);
  //colorMode(HSB,360,100,100,100);
  video = createCapture(VIDEO);
  video.size(width, height);

  poseNet = ml5.poseNet(video, modelReady);

  poseNet.on('pose', function(results) {
    poses = results;
  });

  video.hide();
}

function modelReady() {
  //print("model ready");
}

function mousePressed() {
  console.log(JSON.stringify(poses));
}

function draw() {
  image(video, 0, 0, width, height);
  noStroke();

  if (poses.length > 0) {
    let pose = poses[0].pose;

    let nose = pose['nose'];
    let rightEye = pose['rightEye'];
    let leftEye = pose['leftEye'];

    let distance = dist(rightEye.x, rightEye.y, leftEye.x, leftEye.y);
    const distanceStandard = 75;
    let ratio = distance / distanceStandard;


    let eyeSize = 60 * ratio;
    let eyeSize2 = 30 * ratio;
    let mouthWidth = 80 * ratio;
    let mouthHeight = 25 * ratio;

    let move = sin(frameCount * 0.15) * mouthHeight / 6;
    let move2 = sin(PI + frameCount * 0.15) * mouthHeight / 6;

    fill('#FDFFFC');
    ellipse(rightEye.x, rightEye.y, eyeSize, eyeSize);
    ellipse(leftEye.x, leftEye.y, eyeSize, eyeSize);

    fill('#011627');
    ellipse(rightEye.x, rightEye.y, eyeSize2, eyeSize2);
    ellipse(leftEye.x, leftEye.y, eyeSize2, eyeSize2);

    fill('#E71D36');
    rectMode(CENTER);
    rect(nose.x, nose.y + distance / 2 - mouthHeight / 2 + move, mouthWidth, mouthHeight, 20);
    rect(nose.x, nose.y + distance / 2 + mouthHeight / 2 + move2, mouthWidth, mouthHeight, 20);

    fill('#011627');
    rect(rightEye.x, rightEye.y - distance / 2, mouthWidth * 3 / 4, mouthHeight * 2 / 3, 20);
    rect(leftEye.x, leftEye.y - distance / 2, mouthWidth * 3 / 4, mouthHeight * 2 / 3, 20);

  }
}