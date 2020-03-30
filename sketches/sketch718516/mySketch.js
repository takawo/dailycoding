let img;
let poseNet;
let poses = [];

function setup() {
  createCanvas(640, 360);
  let filePath = 'sports.jpg';
	img = createImg(filePath, imageReady);
  img.size(width, height);
  img.hide();
  frameRate(1);
}

function imageReady() {
  let options = {
    imageScaleFactor: 1,
    minConfidence: 0.1
  }
  poseNet = ml5.poseNet(modelReady, options);
  poseNet.on('pose', function(results) {
    poses = results;
  });
}

function modelReady() {
  poseNet.singlePose(img)
}

function draw() {
  if (poses.length > 0) {
    image(img, 0, 0, width, height);
    drawSkeleton(poses);
    drawKeypoints(poses);
    noLoop();
  }
}


function drawSkeleton() {
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255);
      strokeWeight(1);
      line(partA.position.x, partA.position.y,
        partB.position.x, partB.position.y);
    }
  }
}


function drawKeypoints() {
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.25) {
        fill(255);
        noStroke();
        ellipse(round(keypoint.position.x), round(keypoint.position.y), 8, 8);
      }
    }
  }
}

function drawSkeleton() {
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255);
      strokeWeight(1);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}