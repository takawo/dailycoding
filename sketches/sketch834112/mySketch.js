let video;
let poseNet;
let poses = [];

function setup() {
  createCanvas(640, 480);
	pixelDensity(1);
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
  
  push();
  translate(width,0);
  scale(-1,1);
  image(video, 0, 0, width, height);
  noStroke();

  if (poses.length > 0) {
    
    for(let i  = 0; i < poses.length; i++){
    
    let pose = poses[i].pose;
    let nose = pose['nose'];
    let rightEye = pose['rightEye'];
    let leftEye = pose['leftEye'];
    let rightEar = pose['rightEar'];
    let leftEar = pose['leftEar'];
    
    let d = dist(nose.x,nose.y,rightEar.x,rightEar.y);
    let d2 = dist(nose.x,nose.y,leftEar.x,leftEar.y);
    let angle = atan2(nose.y-rightEar.y,nose.x-rightEar.x);
    d = max(d,d2);
    
    if(pose["score"] > 0.2){
    push();
    translate(nose.x,nose.y);
    textSize(d*3);
    rotate(angle);
    text("👹",0,0);
    pop();
    }
    
    

    let distance = dist(rightEye.x, rightEye.y, leftEye.x, leftEye.y);
    const distanceStandard = 75;
    let ratio = distance / distanceStandard;

    let eyeSize = 70 * ratio;
    let noseSize = 70 * ratio;
    let mouthSize = 80 * ratio;

    let mouth = createVector(nose.x, nose.y + distance / 2 + mouthSize / 8);

    }
  pop();    
  }
}