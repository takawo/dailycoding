//This code is inspired by @onakaG241's tweet.  https://twitter.com/onakaG241/status/1132806009599086593
// emoji reference  : https://lets-emoji.com/emojilist/emojilist-27/

let video;
let poseNet;
let poses = [];
let noiseScale = 200;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  poseNet = ml5.poseNet(video, modelReady);

  poseNet.on('pose', function(results) {
    poses = results;
  });

  video.hide();
  textAlign(CENTER, CENTER);
}

function modelReady() {
  // print("model ready");
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
    // let rightEar = pose['rightEar'];
    // let leftEar = pose['leftEar'];

    let distance = dist(rightEye.x, rightEye.y, leftEye.x, leftEye.y);
    const distanceStandard = 75;
    let ratio = distance / distanceStandard;

    let eyeSize = 70 * ratio;
    let noseSize = 70 * ratio;
    let mouthSize = 80 * ratio;

    let mouth = createVector(nose.x, nose.y + distance / 2 + mouthSize / 8);

    textSize(mouthSize);

    let n = noise(frameCount * 1 / noiseScale);

    if (n < 0.5) {
      text("👄", mouth.x, mouth.y);
    } else {
      text("👅", mouth.x, mouth.y);
    }

    textSize(noseSize);
    text("👃", nose.x, nose.y - noseSize / 5);

    if (n < 0.5) {
      textSize(eyeSize);
      text("👁", int(rightEye.x), int(rightEye.y));
      text("👁", int(leftEye.x), int(leftEye.y));
    } else {
      textSize(eyeSize * 1.8);
      text("👀", (int(rightEye.x) + int(leftEye.x)) / 2, (int(rightEye.y) + int(leftEye.y)) / 2);
    }
  }
}